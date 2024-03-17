import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { UserService } from 'src/app/core/services/user.service';
import { MatDialog } from '@angular/material/dialog'
import { AddCreditComponent } from '../add-credit/add-credit.component';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( 
    private user: UserService,
    private api: ApiService,
    private dialog: MatDialog,
    private loader: LoaderService
    ) {
    this.user.getUser().subscribe(user => {
      this.loggedUser = user? JSON.parse(user): '';
      setTimeout(() => {
        this.ngOnInit();
      }, 200);
    })
  }
  msg_input: string = '';
  loggedUser: any;
  userProfile;
  openchat: boolean = false;

  ngOnInit(): void {
    if(this.loggedUser){
      this.getUserProfile();
      this.user.updateUserProfile().subscribe(user => {
        if (user) {
          this.getUserProfile();
        }
      })
    }
  }

  getUserProfile() {
    this.api.getUserProfile(this.loggedUser.id).subscribe(user => {
      this.userProfile = user;
    })
  }

  user_logout() {
    this.user.user_logout()
  }

  addCredit() {
    const dialogRef = this.dialog.open(AddCreditComponent, {
      width: '600px',
      height: '500px',
      data: {
        userDetails: this.userProfile,
        close: () => {
          dialogRef.close();
        } 
      }
    })
  }
  
  sendMsg() {
    this.loader.start();
    let formData = {
      message: this.msg_input,
      user: this.loggedUser.id
    }
    this.api.sendMsg(formData).subscribe(msg => {
      this.openchat = false;
      this.loader.stop();
    })
  }

}
