import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { User, LoggedUser } from './../login/User';
@Injectable({
  providedIn: 'root'
})
export class LoginService {


  private user: BehaviorSubject<LoggedUser> = new BehaviorSubject<LoggedUser>(new LoggedUser(null,null,null));
  currentUser = this.user.asObservable();

  update_currentUser(user: any) {
    this.user.next(user);
  }



  constructor() { }


  login(user: User) {
    return new Promise(function (resolve, reject) {
      if (user.username == "test" && user.password == "test") {
        resolve(true)
      } else {
        reject(false)
      }
    })
  }




}
