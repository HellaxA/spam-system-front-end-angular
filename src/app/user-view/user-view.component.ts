import { Component, OnInit } from '@angular/core';
import {User} from "../common/user";
import {UserService} from "../services/user.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers() {
    return this.userService.getUsers().subscribe(
      data => {
        this.users = data;
      }
    );
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user).subscribe();
    const index: number = this.users.indexOf(user);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }
}
