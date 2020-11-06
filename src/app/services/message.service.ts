import { Injectable } from '@angular/core';
import {Message} from "../common/message";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  getMessages(): String[] {
    return new Message().messages;
  }
}
