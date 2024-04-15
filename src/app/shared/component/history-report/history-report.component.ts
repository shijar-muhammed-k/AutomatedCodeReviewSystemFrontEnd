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
  pageCount: any;
  currentPage: number = 1;
  sort_option: string = 'all';

  constructor(
    private api: ApiService,
    private loader: LoaderService,
    private dialog: MatDialog,
    private user: UserService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.getList();
  }
  
  getList(search = '', page = 1) {
    this.loader.start();
    this.api.getHistory(search, page).subscribe((data) => {
      this.loader.stop();
      this.codeHistory = data['results']['data'];
      this.pageCount = this.calculatePageCount(data['count'])
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
    console.log(data.code_report)
    data.code_report = JSON.parse(data.code_report);
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

  searchUser(event) {
    this.getList(event.target.value);
    this.currentPage = 1
  }

  calculatePageCount(count) {
    return Math.ceil(count / 10);
  }

  getPages(): number[] {
    return Array(this.pageCount).fill(0).map((x, i) => i + 1);
  }

  changePage(page) {
    console.log(page)
    event.preventDefault();
    if(page === 'previous') {
      if(this.currentPage == 1) {
        return
      }
      this.currentPage = this.currentPage - 1;
    } else if(page === 'next') {
      if (this.currentPage === this.pageCount) {
        return
      }
      this.currentPage = this.currentPage + 1;
    } else {
      this.currentPage = page;
    }
    this.getList('', this.currentPage)
  }

  userChange(event) {
    console.log(event.target.value)
  }

}
