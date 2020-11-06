import {Component, OnInit} from '@angular/core';
import {MessageService} from "../services/message.service";
import {FormBuilder, FormGroup} from "@angular/forms";


import {UserService} from "../services/user.service";
import {User} from "../common/user";
import {Email} from "../common/email";
import {Router} from "@angular/router";

@Component({
  selector: 'app-send-form',
  templateUrl: './send-form.component.html',
  styleUrls: ['./send-form.component.css']
})
export class SendFormComponent implements OnInit {

  messages: String[];
  currentMessageTopic: String = "";
  messageFormGroup: FormGroup;
  users: User[] = [];
  usersEmails: string[] = [];

  constructor(private messageService: MessageService,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private route: Router) {
  }

  ngOnInit(): void {
    this.getMessages();
    this.messageFormGroup = this.formBuilder.group({
      currentMessage: [''],
      currentTopic: ['']
    });
    this.userService.getUsers().subscribe(data => {
      this.getUsersEmail(data);
    });
  }

  getMessages() {
    this.messages = this.messageService.getMessages();
  }

  onSubmit() {
    let mail: Email = new Email(this.currentTopic, this.currentMessage, this.usersEmails);

    this.userService.sendMessage(mail).subscribe();

    this.route.navigate(["users"]);
  }

  getUsersEmail(users: User[]) : void {
    for(let user of users) {
      this.usersEmails.push(user.email);
    }
  }

  get currentMessage() { return this.messageFormGroup.get('currentMessage').value }
  get currentTopic() { return this.messageFormGroup.get('currentTopic').value }
}
