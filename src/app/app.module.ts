import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AttachListComponent } from './attach-list/attach-list.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { SnackbarModule } from 'ngx-snackbar';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AttachListComponent,
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    SnackbarModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule
    
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy },],
  bootstrap: [AppComponent]
})
export class AppModule { }
