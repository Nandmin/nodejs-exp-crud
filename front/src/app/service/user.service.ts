import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = 'http://localhost:3000/api/users';
  // a subject egy speciális típusa az observablenek, értesítésre lehet használni
  list$: Subject<any> = new Subject();

  constructor(
    private http: HttpClient
  ) { }

  get(id: number = 0) {
    this.http.get<User[]>(`${this.apiUrl}/${id}`).forEach(
      // minden művelet után automatikusan befrissül az oldal, tehát az aktuális adatok jelennek meg
      users => this.list$.next(users)
    );
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
  }

  delete(user: User): Observable<User> {
    // a törlés megtörténtekor a pipe elkapja az adatot
    return this.http.delete<User>(`${this.apiUrl}/${user.id}`).pipe(
      //megérinti de nem csinál vele semmit,csak meghívja a get-et
      tap(data => {
        // lekéri az adatokat és értesít mindenkit, hogy módosultak az adatok
        this.get();
      }
    ));
  }
}
