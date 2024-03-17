import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-add-credit',
  templateUrl: './add-credit.component.html',
  styleUrls: ['./add-credit.component.scss']
})
export class AddCreditComponent {

  
  addCredit: boolean = false;
  amount: number;
  userDetails;
  addAmountForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private tost: ToastrService,
    private api: ApiService,
    private loader: LoaderService,
    private user: UserService
    ) {
    this.userDetails = this.data.userDetails;
    this.addAmountForm = this.fb.group({
      card_number: new FormControl('', Validators.required),
      month: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      cvv: new FormControl('', Validators.required)
    })
  }

  addAmount() {
    if(this.addAmountForm.controls['card_number'].value !== 4242424242424242) {
      this.tost.warning('Card Not Valid')
      return
    }
    if(this.addAmountForm.valid) {
      this.loader.start();
      let tid = this.generateRandomNumber();
      let formData = {
        payment_profile: this.userDetails.id,
        amount: this.amount,
        transcation_id: tid,
        created_date: this.formatDateToYYYYMMDD(new Date()),
      }
      this.api.addCredit(formData).subscribe(data => {
        console.log(data)
        this.loader.stop();
        this.user.initUserProfileUpdate();
        this.data.close();
      })
    } else {
      this.tost.error('Invalid Card Details')
    }
  }

  formatDateToYYYYMMDD(date: Date): string {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
  }

  generateRandomNumber() {
    let randomNumber = '';
    for (let i = 0; i < 14; i++) {
      // Generate a random digit (0-9) and append it to the random number string
      randomNumber += Math.floor(Math.random() * 10);
    }
    return randomNumber;
  }

}
