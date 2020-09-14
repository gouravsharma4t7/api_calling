import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpHeaderResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  tableData(){

  }

//   getaccountSatement(): Observable<any> {
//     return this.http.get<any>('https://jsonplaceholder.typicode.com/photos');
// }


}
