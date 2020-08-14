import { Injectable } from '@angular/core';
 

@Injectable({
  providedIn: 'root'
})
export class ApiService  {

  constructor() { }
  getTask(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
