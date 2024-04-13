import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class Base64Service {

  constructor(
    private http: HttpClient
  ) { }

  

}
