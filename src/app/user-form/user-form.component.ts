import {Component, OnInit} from '@angular/core';
import {User} from "../common/user";
import {UserService} from "../services/user.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  title: string = "";
  user: User = new User();
  userFormGroup: FormGroup;
  updateMode: boolean = false;


  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const updateMode = this.activatedRoute.snapshot.paramMap.has('id');

    this.userFormGroup = this.formBuilder.group({
      user: this.formBuilder.group({
        first_name: [''],
        last_name: [''],
        middle_name: [''],
        email: ['']
      })
    });

    if (updateMode) {
      const id = +this.activatedRoute.snapshot.paramMap.get('id');
      this.getUser(id);
      this.title = "Update User";
    } else {
      this.title = "New User"
    }

  }

  public getUser(id: number) {
    return this.userService.getUser(id).subscribe(data => {
      this.user = data[0];
      this.userFormGroup.setValue({
        user: {
          first_name: data[0].first_name,
          last_name: data[0].last_name,
          middle_name: data[0].middle_name,
          email: data[0].email
        }
      });
    });
  }

  public addUser(user: User) {
    this.userService.addUser(user).subscribe();
  }

  private updateUser(user: User) {
    this.userService.updateUser(user).subscribe();
  }

  onSubmit(): void {
    this.user.first_name = this.userFormGroup.get('user').get('first_name').value;
    this.user.last_name = this.userFormGroup.get('user').get('last_name').value;
    this.user.middle_name = this.userFormGroup.get('user').get('middle_name').value;
    this.user.email = this.userFormGroup.get('user').get('email').value;

    if (this.activatedRoute.snapshot.paramMap.has('id')) {
      this.updateUser(this.user);
    } else {
      this.addUser(this.user);
    }
    this.router.navigate(['users']);
  }

}
