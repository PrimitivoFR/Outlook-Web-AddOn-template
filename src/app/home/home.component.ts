import { Component, OnInit } from '@angular/core';
import { LoginService } from './../services/login.service';
import { User, LoggedUser } from './../login/User';
import { OutlookService } from './../services/outlook.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: LoggedUser;

  constructor(private LoginService: LoginService, private OutlookService: OutlookService, private routes: Router) { }


  getOutlookToken(fn) {
    Office.context.mailbox.getCallbackTokenAsync({ isRest: true }, function (result) {
      if (result.status.toString() === "succeeded") {
        var accessToken = result.value;

        // Use the access token.
        return fn(accessToken)
      } else {
        // Handle the error.
      }
    });

  }


  getItemRestId() {
    if (Office.context.mailbox.diagnostics.hostName === 'OutlookIOS') {
      // itemId is already REST-formatted.
      return Office.context.mailbox.item.itemId;
    } else {
      // Convert to an item ID for API v2.0.
      return Office.context.mailbox.convertToRestId(
        Office.context.mailbox.item.itemId,
        Office.MailboxEnums.RestVersion.v2_0
      );
    }
  }

  ngOnInit() {
    this.LoginService.currentUser.subscribe(user => this.user = user);
  }

}
