import { Injectable, Component } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { User } from './../login/User';
import * as pdfHtml from 'html-pdf'
import * as jsPdf from 'jspdf';
import { Attachment } from './../attach-list/Attachment';


@Injectable({
  providedIn: 'root'
})
export class OutlookService {

  constructor(private httpClient: HttpClient) { }


  set_httpOptions(accessToken) {
    var httpOptions
    return httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + accessToken }) }
  };


  options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getEmail(url, accessToken) {
    return this.httpClient.get(url, this.set_httpOptions(accessToken));
  }

  getEmail_MIME_EML(url, accessToken) {
    return this.httpClient.get(url, { headers: new HttpHeaders({ 'Content-Type': 'text/plain', 'Authorization': 'Bearer ' + accessToken }), responseType: 'text' })
  }

  getAttachement(url, accessToken, attachementID) {
    return this.httpClient.get(url + "/" + attachementID, this.set_httpOptions(accessToken))
  }

  getAttachementV2(messageID, attachmentID, accessToken) {
    return this.httpClient.get("https://graph.microsoft.com/v1.0/me/messages/" + messageID + "/attachments/" + attachmentID, this.set_httpOptions("eyJ0eXAiOiJKV1QiLCJub25jZSI6Inc3UEVxVmExbGRYR3hERjRZNU1HUVpxckhhSGtwT25Va05NTXl1SkFpSW8iLCJhbGciOiJSUzI1NiIsIng1dCI6InBpVmxsb1FEU01LeGgxbTJ5Z3FHU1ZkZ0ZwQSIsImtpZCI6InBpVmxsb1FEU01LeGgxbTJ5Z3FHU1ZkZ0ZwQSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9iYzVhYzU4My02NDhhLTQwMDctYmJhMy02NjE2NzYwNGRmOTQvIiwiaWF0IjoxNTc5MDIwNzY1LCJuYmYiOjE1NzkwMjA3NjUsImV4cCI6MTU3OTAyNDY2NSwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFTUUEyLzhPQUFBQVJubnRDK21mT1REaFJrV2J5czNxbExtamtKemFBY21qeFg1RmdYemozUFE9IiwiYW1yIjpbInB3ZCJdLCJhcHBfZGlzcGxheW5hbWUiOiJHcmFwaCBleHBsb3JlciIsImFwcGlkIjoiZGU4YmM4YjUtZDlmOS00OGIxLWE4YWQtYjc0OGRhNzI1MDY0IiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJNYXJ0aW4iLCJnaXZlbl9uYW1lIjoiVGhvbWFzIiwiaXBhZGRyIjoiMTkzLjQ4LjIzMS4yMTciLCJuYW1lIjoiVGhvbWFzIE1hcnRpbiIsIm9pZCI6ImVkYWQxZGQzLTExZGItNGFhYS1iMmViLWY4M2IxN2Y3YjlkOCIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS0zNDMwMTIzODYzLTQxMTQ1MzQ3Ny0zOTQ4MTAzMjQtMzk2NSIsInBsYXRmIjoiMyIsInB1aWQiOiIxMDAzN0ZGRUFGNDYzNkMxIiwic2NwIjoicHJvZmlsZSBvcGVuaWQgZW1haWwgVXNlci5SZWFkV3JpdGUgVXNlci5SZWFkQmFzaWMuQWxsIFNpdGVzLlJlYWRXcml0ZS5BbGwgQ29udGFjdHMuUmVhZFdyaXRlIFBlb3BsZS5SZWFkIE5vdGVzLlJlYWRXcml0ZS5BbGwgVGFza3MuUmVhZFdyaXRlIE1haWwuUmVhZFdyaXRlIEZpbGVzLlJlYWRXcml0ZS5BbGwgQ2FsZW5kYXJzLlJlYWRXcml0ZSIsInN1YiI6IklrUy1NbTNBSXh5LTBDaVVRVzFXenRVaS11VjdSSEFjS2lfTk5DYWl4TlkiLCJ0aWQiOiJiYzVhYzU4My02NDhhLTQwMDctYmJhMy02NjE2NzYwNGRmOTQiLCJ1bmlxdWVfbmFtZSI6InRtYXJ0aW5AZGl2YWx0by5jb20iLCJ1cG4iOiJ0bWFydGluQGRpdmFsdG8uY29tIiwidXRpIjoiM1ZLYUNoZ2MtRTZZYXYyYm5MREVBQSIsInZlciI6IjEuMCIsInhtc19zdCI6eyJzdWIiOiI4NWUzUkl2Y3IxWXo3LVF0R0l6X0Y3c3JkMi05RTFvSHo3b2tNdHVjU2JjIn0sInhtc190Y2R0IjoxNDMwMjM3Nzg5fQ.ieyh1pJ9eAVmUGb1xgsgF_8urIRv0bedXHp_gEkBkYHAhOxWvACsiWQxlaj_fVU-eborGDpsiB0xRzDKkU9Bb4VM2MynfIMNXIiZpmKilgxBq7tm8xn0hOF2nUZc0c7QRZ3uE6i5KuKtdY-XH8upHhu2-D-GGDqF_QOHJYSJgML8Ra0U9rbR0dwCQlYeMcxGqi_hVqWE9jZWVpGcxoAwBfbLL4vpwQkdil25OoBo4DlOTdgKTNz2r3JGQYvBnBXv9J0Q5hinDYTq2ipEr8UNxg72tHsmMEJhTNW7vRaWF2xV6F0bBmgVMr1tj89oE_J9TaLDNOqJ3VoC_Yn4Gx3uog"))
  }


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

  cleanFileName(name) {
    var cleanedName = name.toString().replace(">","_").replace("<","_").replace(":","_").replace(" ","_").replace('"',"_").replace("/","_").replace("\\","_").replace("|","_").replace("?","_").replace("*","_");
    return cleanedName
  }

  getEmailMIME_ForEM() {

    var ItemId = this.getItemRestId();
    var RestURL = Office.context.mailbox.restUrl;
    var _this = this;

    return new Promise(function (resolve, reject) {
      _this.getOutlookToken((accessToken) => {

        _this.getEmail(RestURL + '/v2.0/me/messages/' + ItemId, accessToken).subscribe((res: any) => {

          _this.getEmail_MIME_EML(RestURL + '/v2.0/me/messages/' + ItemId + "/$value", accessToken).subscribe((res2: any) => {
            if (res2) {
              var contentEMAIL = btoa(res2);
              var emailAsAttch;
              var Subject = _this.cleanFileName(res.Subject)
              emailAsAttch = {
                Id: res.Id,
                Name: Subject + '.eml',
                ContentBytes: contentEMAIL
              }
              resolve(emailAsAttch);
            }

          })

        })


      })
    })

  }

  get_AttachementsArray() {
    var ItemId = this.getItemRestId();
    var RestURL = Office.context.mailbox.restUrl;
    var _this = this;

    return new Promise(function (resolve, reject) {

      _this.getOutlookToken((accessToken) => {

        _this.getEmail(RestURL + '/v2.0/me/messages/' + ItemId + '/attachments', accessToken).subscribe((res: any) => {

          resolve(res.value)

        })
      })
    })

  }


}
