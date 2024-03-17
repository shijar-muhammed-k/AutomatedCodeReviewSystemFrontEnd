import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-reply-message',
  templateUrl: './reply-message.component.html',
  styleUrls: ['./reply-message.component.scss']
})
export class ReplyMessageComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loader: LoaderService,
    private api: ApiService,
    private toast: ToastrService
  ) { }

  subject: string = '';
  message: string = '';

  sendReply() {
    if(this.subject.length == 0 && this.message.length == 0){
      this.toast.error('Please Fill the fields')
      return
    }
    this.loader.start();
    let data = {
      message : this.message,
      subject: this.subject,
      id: this.data.data.id
    }
    this.api.replyMail(data).subscribe(data => {
      this.toast.success('Message Sent Successfully');
      this.loader.stop();
      this.data.close();
    })
  }

}
