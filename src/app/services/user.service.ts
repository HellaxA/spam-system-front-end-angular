import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {User} from "../common/user";
import {catchError, tap} from "rxjs/operators";
import {Email} from "../common/email";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  userUrl: string = "http://localhost:8080/api/users";

  emailUrl: string = "http://localhost:8080/contact";

  constructor(private httpClient: HttpClient) { }

  getUsers() : Observable<User[]> {
    return this.httpClient.get<User[]>(this.userUrl)
      .pipe(
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }

  addUser(user: User) : Observable<User> {
    return this.httpClient.post(this.userUrl, user, this.httpOptions).pipe(
      tap((newUser: User) => console.log(`added user id=${newUser.id}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }

  updateUser(user: User) {
    return this.httpClient.put(`${this.userUrl}/${user.id}`, user,this.httpOptions).pipe(
      tap(_ => console.log(`updated user id=${user.id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  deleteUser(user: User): Observable<User> {
    let deleteUrl = `${this.userUrl}/${user.id}`;
    return this.httpClient.delete<User>(deleteUrl, this.httpOptions).pipe(
      tap(_ => console.log(`deleted user: ${user.id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  getUser(id: number) : Observable<User[]>{
    const getUrl = `${this.userUrl}/${id}`;
    return this.httpClient.get<User[]>(getUrl, this.httpOptions).pipe(
      tap(_ => console.log(`got user ${id}`)),
      catchError(this.handleError<User[]>('getUser'))
    );
  }

  sendMessage(mail: Email) : Observable<Email> {
    return this.httpClient.post<Email>(this.emailUrl, mail, this.httpOptions).pipe(
      tap(_ => console.log(`sent to ${mail.to_emails}`)),
      catchError(this.handleError<Email>('sendMessage'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
