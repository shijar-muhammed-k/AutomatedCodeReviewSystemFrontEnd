import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { MatDialog } from '@angular/material/dialog'
import { ModalComponent } from '../modal/modal.component'
import { UserService } from 'src/app/core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { load } from 'mime';

@Component({
  selector: 'app-history-report',
  templateUrl: './history-report.component.html',
  styleUrls: ['./history-report.component.scss']
})
export class HistoryReportComponent implements OnInit{

  codeHistory;

  constructor(
    private api: ApiService,
    private loader: LoaderService,
    private dialog: MatDialog,
    private user: UserService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.loader.start();
    this.api.getHistory().subscribe((data) => {
      this.loader.stop();
      this.codeHistory = data['data'];
      this.codeHistory.forEach(element => {
        const timestamp = new Date(element.upload_at);

        const year = timestamp.getUTCFullYear();
        const month = timestamp.getUTCMonth() + 1;
        const day = timestamp.getUTCDate();

        element.created_date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      })
    })
  }
  
  showReport(id) {
    console.log(id)
    let data = this.codeHistory.find(element => element.id = id)
    console.log(data)
    this.dialog.open(ModalComponent, {
      width: '600px',
      height: '500px',
      data: {
        data: data
      }
    })
  }

  fix_code(id) {
    this.loader.start();
    let file = this.codeHistory.find(element => element.id == id);
    this.api.fixCode({}, id).subscribe(data => {
      this.loader.stop();
      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      file.restructured_code = true;
      this.user.userLoginCheck.next(this.user.userLoginCheck.value);
    }, err => {
      if(err.status === 500) {
        this.loader.stop();
        this.toast.info('Sorry you have insufficient credit points. Need 10 credit points for one fix')
      }
    })
  }

}
