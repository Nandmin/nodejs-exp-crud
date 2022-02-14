import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl:string = 'http://localhost:3000/users';

  constructor(
    private http: HttpClient
  ) { }

  get(id: number = 0): Observable<any> {

  }

  create(user: User){

  }

  update(user: User){

  }

  delete(user: User){
    
  }
}
