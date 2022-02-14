import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserService } from '../service/user.service';
import { User } from '../model/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

    list$: Subject<User[]> = this.userService.list$;
    columns: {key: string, title: string}[] = [
       {key: 'id', title: 'ID'},
      { key : 'isActive', title: 'Active'},
      // { key : 'balance', title: 'Balance'},
      { key : 'age', title: 'Age'},
      { key : 'name', title: 'Name' },
      { key : 'company', title: 'Company'},
      { key : 'email', title: 'Email'},
      { key : 'address', title: 'Address'}
    ];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.get();
  }

  getNamePart(name:any, key:any): string {
    return name[key];
  }


  delete(user: User){
    this.userService.delete(user).subscribe(
      response => console.log(response)
    );
    alert('User deleted!');
  }
}
