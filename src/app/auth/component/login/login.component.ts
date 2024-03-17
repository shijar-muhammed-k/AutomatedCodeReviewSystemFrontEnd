import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ApiService } from 'src/app/core/services/api.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  constructor (
    private fb: FormBuilder,
    private toast: ToastrService,
    private api: ApiService,
    private loader: LoaderService,
    private userService: UserService
  ) {}

  loginForm: FormGroup
  imcorrectCredentials: boolean = false;
  loginFormSubmitted: boolean = false;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  get f() {
    return this.loginForm.controls;
  }

  user_login() {
    this.loginFormSubmitted = true;
    if(this.loginForm.valid) {
      this.loader.start();
      this.api.userLogin(this.loginForm.value).subscribe(data => {
        this.toast.info('Logged in successfully');
        this.userService.setLoggedUser(data);
        this.loader.stop();
      }, error => {
        this.toast.error('Failed to login')
        this.loader.stop();
      })
    }
  }

}
