import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { blob } from 'stream/consumers';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  getReport(file: FormData) {
    const url = 'review/code/';
    return this.http.post(url, file);
  }

  userLogin(formData) {
    const url = 'user/login/';
    return this.http.post(url, formData);
  }

  userSignUp(formData) {
    const url = 'user/profile/';
    return this.http.post(url, formData);
  }

  getUserProfile(id) {
    const url = `user/profile/${id}`;
    return this.http.get(url);
  }

  fixCode(formData, id) { 
    const url = `review/fix/${id}`;
    return this.http.post(url, formData, {responseType: "blob"});
  }
  
  addCredit(formData) {
    const url = 'user/payment/';
    return this.http.post(url, formData);
  }

  getPaymentList() {
    const url = 'user/payment/';
    return this.http.get(url);
  }

  getHistory(search, page) {
    const url = `review/code/?search=${search}&page=${page}`;
    return this.http.get(url);
  }

  getRevenue(search, page) {
    const url = `review/balance?search=${search}&page=${page}`;
    return this.http.get(url);
  }

  getUserList(search = '', page) {
    const url = `user/profile/?search=${search}&page=${page}`;
    return this.http.get(url);
  }

  updateProfile(id, formData) {
    const url = `user/profile/${id}`;
    return this.http.patch(url, formData);
  }

  sendMsg(msg) {
    const url = 'user/messages/';
    return this.http.post(url, msg);
  }

  getMsgs() {
    const url = 'user/messages/';
    return this.http.get(url);
  }

  replyMail(message) {
    const url = 'user/messages/';
    return this.http.patch(url, message);
  }

}
