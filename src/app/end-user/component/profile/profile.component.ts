import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  profileForm: FormGroup;
  ptofileFormSubmitted: boolean;
  loggedUser = JSON.parse(this.user.userLoginCheck.value);

  constructor(
    private fb: FormBuilder,
    private loader: LoaderService,
    private toast: ToastrService,
    private api: ApiService,
    private user: UserService
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      dob: new FormControl(''),
      gender: new FormControl(''),
      profession: new FormControl('')
    });

    this.api.getUserProfile(this.loggedUser.id).subscribe(profile => {
      this.profileForm.patchValue(profile)
    })

  }

  updatePofile() {
    this.ptofileFormSubmitted = true;
    if(this.profileForm.valid) {
      this.loader.start();
      this.api.updateProfile(this.loggedUser.id, this.profileForm.value).subscribe(data => {
        this.loader.stop();
        this.toast.success('Profile Updated Successfully')
      })
    }
  }
  
}
