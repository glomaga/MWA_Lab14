import { Injectable } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class DbService {

  constructor(public http: Http) { }
  getUser(){
    return this.http.get("http://jsonplaceholder.typicode.com/users/1")  .map(res=> res.json());
  }
  getPost(){
    return this.http.get("http://jsonplaceholder.typicode.com/posts?userId=1")  .map(res=> res.json());
  }
}
