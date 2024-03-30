import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  userList;
  pageCount: any;
  currentPage: number = 1;

  constructor(
    private api: ApiService,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  getList(search = '', page = 1) {
    this.loader.start();
    this.api.getUserList(search, page).subscribe((data) => {
      this.loader.stop();
      this.userList = data['results'];
      this.userList.forEach(element => {
        const timestamp = new Date(element.date_joined);

        const year = timestamp.getUTCFullYear();
        const month = timestamp.getUTCMonth() + 1;
        const day = timestamp.getUTCDate();

        element.date_joined = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      })
    })
  }

  searchUser(event) {
    this.getList(event.target.value);
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

}
