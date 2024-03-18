import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../core/services/api.service'
import { UserService } from 'src/app/core/services/user.service';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-check-file',
  templateUrl: './check-file.component.html',
  styleUrls: ['./check-file.component.scss']
})
export class CheckFileComponent {

  report_recieved: boolean = false;
  report: string = '';
  file: File;
  fileUploaded: boolean = false;
  userLoggedIn;
  report_data;

  constructor(
    private api: ApiService,
    private toast: ToastrService,
    private user: UserService,
    private loader: LoaderService
    ) {
      user.getUser().subscribe(user => {
        this.userLoggedIn = JSON.parse(user)
      })
    }

  onDragEnter(event: DragEvent) {
    event.preventDefault(); 
    console.log(event)
  }
  
  onDragOver(event: DragEvent) {
    console.log(event)
    event.preventDefault(); 
  }
  
  onDragLeave(event: DragEvent) {
    console.log(event)
    event.preventDefault(); 
  }
  
  onDrop(event: DragEvent) {
    event.preventDefault(); 
    console.log(event)
  }


  onFileUpload(event: any) {
    this.file = event.target.files[0];
    if(!this.file.type.includes('python')) {
      this.toast.error('Sorry, Only python files are allowed')
      return
    }
    this.fileUploaded = true;
  }


  checkCode() {
    this.loader.start();
    const formdata = new FormData;
    formdata.append('file', this.file);
    formdata.append('upload_at', this.formatDateToYYYYMMDD(new Date()));

    this.api.getReport(formdata).subscribe(data => {
      this.loader.stop();
      this.report_data = data as ReportInterface;
      this.report_recieved = true;
      this.report = this.report_data.report;
  });
  }


  formatDateToYYYYMMDD(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  fix_code() {
    this.api.getUserProfile(this.userLoggedIn.id).subscribe(data => {
      if(data['credit_points'] < 10) {
        this.toast.info('Sorry you have insufficient credit points. Need 10 credit points for one fix')
        return
      } else {
        this.loader.start();
        this.api.fixCode({}, this.report_data.id).subscribe(data => {
        this.loader.stop();
        const url = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = url;
        link.download = this.file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        this.user.userLoginCheck.next(this.user.userLoginCheck.value);
      })
    }
    });
  }

}

export interface ReportInterface {
  status: boolean;
  report: string
}