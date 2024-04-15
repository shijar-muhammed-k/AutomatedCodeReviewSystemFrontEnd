import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.scss']
})
export class RevenueComponent {
  revenueHistory;
  currentPage: number;
  pageCount: any;
  this_month_data: number;
  today_data: number;
  total_revenue: number;

  constructor(
    private api: ApiService,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  getList(search = '', page = 1) {
    this.loader.start();
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getUTCDate();

    this.this_month_data = 0;
    this.today_data = 0;
    this.api.getRevenue(search, page).subscribe((data) => {
      this.loader.stop();
      this.revenueHistory = data['results'];
      this.total_revenue = data['count'] * 10;
      this.revenueHistory.forEach(element => {
        const timestamp = new Date(element.date);

        const year = timestamp.getUTCFullYear();
        const month = timestamp.getUTCMonth() + 1;
        const day = timestamp.getUTCDate();

        element.created_date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

        month === currentMonth? this.this_month_data = this.this_month_data + 1: ''; 

        if (month === currentMonth && day === currentDay) {
          this.today_data++;
        }

      })
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
}
