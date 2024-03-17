import { Component } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {

  user;
  constructor (
    private userService: UserService
  ) {
    this.user = JSON.parse(this.userService.userLoginCheck.value);
  }

}
