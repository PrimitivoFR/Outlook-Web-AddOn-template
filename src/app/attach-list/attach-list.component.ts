import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from './../services/login.service';
import { OutlookService } from './../services/outlook.service';
import { Attachment } from './Attachment';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from 'ngx-snackbar';
import { snackMessage } from './../general_functions/TriggerSnackMessage';
import { LoggedUser } from '../login/User';

@Component({
  selector: 'app-attach-list',
  templateUrl: './attach-list.component.html',
  styleUrls: ['./attach-list.component.css']
})
export class AttachListComponent implements OnInit {
  constructor(private routes: Router, private route: ActivatedRoute, private snackbarService: SnackbarService, private LoginService: LoginService, private OutlookService: OutlookService, private spinner: NgxSpinnerService) { }
  user: LoggedUser;
  attachments: Attachment[] = [];
  selectedAttachments: Attachment[] = [];

  showPieceName(name) {
    if (name.indexOf(".eml") !== -1) {
      return "Full email (MIME / .eml file)"
    } else {
      return name
    }
  }


  downloadFile(data: any, fileName: string) {
    var bytes = this.base64ToArrayBuffer(data);
    this.saveByteArray(fileName, bytes)
  }

  base64ToArrayBuffer(base64) {
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
      var ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  }

  saveByteArray(reportName, byte) {
    var blob = new Blob([byte]);
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    var fileName = reportName;
    link.download = fileName;
    link.click();
  }

  downloadData() {
    var selectedAttchCount = 0
    this.attachments.map((attachment) => {
      if (attachment.selected) {
        selectedAttchCount += 1;
        this.downloadFile(attachment.content.ContentBytes, attachment.content.Name)
      }
    })
    if (selectedAttchCount == 0) {
      snackMessage(this, "No data selected");
    }
  }


  addInitialAttachments(attachment) {
    var attch = new Attachment();
    attch.content = attachment;
    attch.selected = false

    this.attachments.push(attch)

  }



  ngOnInit() {

    this.spinner.show();
    this.LoginService.currentUser.subscribe(user => this.user = user);

    if (this.user.username == null) {
      this.spinner.hide();
      this.routes.navigate([`/`])
    }
    else {
      this.OutlookService.get_AttachementsArray().then((res: []) => {

        res.map((attachment) => this.addInitialAttachments(attachment));
        this.OutlookService.getEmailMIME_ForEM().then(email => {

          this.addInitialAttachments(email);
          this.spinner.hide();

        })

      });

    }


  }

}
