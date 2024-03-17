import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ReplyMessageComponent } from 'src/app/shared/component/reply-message/reply-message.component';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit{
  messageHistory;;

  constructor(
    private api: ApiService,
    private loader: LoaderService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loader.start();
    this.api.getMsgs().subscribe((data) => {
      this.loader.stop();
      this.messageHistory = data;
      this.messageHistory.forEach(element => {
        const timestamp = new Date(element.upload_at);

        const year = timestamp.getUTCFullYear();
        const month = timestamp.getUTCMonth() + 1;
        const day = timestamp.getUTCDate();

        element.created_date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      })
    })
  }

  checkAndReply(id) {
    let msg = this.messageHistory.find(element => element.id === id);
    if (!msg.replied) {
      const dialogRef = this.dialog.open(ReplyMessageComponent, {
        width: '500px',
        height: '500px',
        data: {
          data: msg,
          close: () => {
            msg.replied = true;
            dialogRef.close();
          }
        }
      })
    }
  }

}
