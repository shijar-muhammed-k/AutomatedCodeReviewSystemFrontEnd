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

  constructor(
    private api: ApiService,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.loader.start();
    this.api.getUserList().subscribe((data) => {
      this.loader.stop();
      this.userList = data;
      this.userList.forEach(element => {
        const timestamp = new Date(element.date_joined);

        const year = timestamp.getUTCFullYear();
        const month = timestamp.getUTCMonth() + 1;
        const day = timestamp.getUTCDate();

        element.date_joined = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      })
    })
  }
}
