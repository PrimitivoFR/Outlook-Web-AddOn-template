import { Component, OnInit } from '@angular/core';
import { LoginService } from './../services/login.service';
import { User, LoggedUser } from './User';
import { Routes, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnackbarService } from 'ngx-snackbar';
import { snackMessage } from './../general_functions/TriggerSnackMessage';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  currentUser: User = { username: null, password: null };

  constructor(private LoginService: LoginService, private routes: Router, private spinner: NgxSpinnerService, private snackbarService: SnackbarService) { }

  logIn(form) {
    this.spinner.show()
    this.LoginService.login(form.value)
      .then((res: any) => {
        this.spinner.hide()
        if (res) {
          var loggedUser = new LoggedUser(form.value.username, "1234", "1234")
          this.routes.navigate(['home']);
          snackMessage(this, "You're now logged in :)");
          this.LoginService.update_currentUser(loggedUser);
        } else {
         
          snackMessage(this, "An error has occured")
        }
      })
      .catch((re: any) => {
        this.spinner.hide()
        snackMessage(this, "An error has occured")
      })

  }

  ngOnInit() {
  }

}
