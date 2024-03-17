import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor (
    private api: ApiService,
    private router: Router
  ) {}

  public userLoginCheck = new BehaviorSubject(localStorage.getItem('AutomatedCodeReviewSystemUser') || '')
  userProfileUpdate = new Subject();

  setLoggedUser(user) {
    localStorage.setItem('AutomatedCodeReviewSystemUser', JSON.stringify(user));
    this.userLoginCheck.next(JSON.stringify(user));
    this.router.navigate(['/home']);
  }

  getUser() {
    return this.userLoginCheck.asObservable();
  }

  user_logout() {
    localStorage.removeItem('AutomatedCodeReviewSystemUser');
    this.userLoginCheck.next('');
    this.router.navigate(['/login']);
  }

  updateUserProfile() {
    return this.userProfileUpdate.asObservable()
  }

  initUserProfileUpdate() {
    this.userProfileUpdate.next(true)
  }

}


export interface UserLogin {
  access: string;
  role: number;
  id: number;
}