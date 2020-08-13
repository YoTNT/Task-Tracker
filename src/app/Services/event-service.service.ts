import { Injectable, EventEmitter } from '@angular/core';
import { UserProgress } from '../Models/user-progress';

@Injectable({
  providedIn: 'root'
})
export class EventService  {
  UserProgressAdded = new EventEmitter<UserProgress>();
  constructor() { }
}
