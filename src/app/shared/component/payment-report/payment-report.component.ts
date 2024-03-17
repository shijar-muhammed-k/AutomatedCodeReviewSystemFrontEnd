import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-payment-report',
  templateUrl: './payment-report.component.html',
  styleUrls: ['./payment-report.component.scss']
})
export class PaymentReportComponent implements OnInit {

  paymentHistory;

  constructor(
    private api: ApiService,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.loader.start();
    this.api.getPaymentList().subscribe((data) => {
      this.loader.stop();
      this.paymentHistory = data;
      this.paymentHistory.forEach(element => {
        const timestamp = new Date(element.created_date);

        const year = timestamp.getUTCFullYear();
        const month = timestamp.getUTCMonth() + 1;
        const day = timestamp.getUTCDate();

        element.created_date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      })
    })
  }

}
