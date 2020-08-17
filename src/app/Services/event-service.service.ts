import { Injectable, EventEmitter } from '@angular/core';
import { UserProgress } from '../Models/user-progress';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class EventService  {
  UserProgressAdded = new EventEmitter<UserProgress>();
  UserLoogedIn = new EventEmitter<User>();
  constructor() { }
}
