import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit{

  constructor (
    private fb: FormBuilder,
    private toast: ToastrService,
    private api: ApiService,
    private loader: LoaderService,
    private userService: UserService
  ) {}

  signUpForm: FormGroup
  imcorrectCredentials: boolean = false;
  signUpFormSubmitted: boolean = false;

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      username: new FormControl('', Validators.required),
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  get f() {
    return this.signUpForm.controls;
  }

  user_signUp() {
    this.signUpFormSubmitted = true;
    if(this.signUpForm.valid) {
      this.loader.start();
      this.api.userSignUp(this.signUpForm.value).subscribe(data => {
        this.api.userLogin({username: this.f['email'].value, password: this.f['password'].value}).subscribe((data) => {
          this.toast.info('Logged in successfully');
          this.userService.setLoggedUser(data);
          this.loader.stop();
        })
      }, error => {
        this.toast.error('Username already in use')
        this.loader.stop();
      })
    }
  }

}
