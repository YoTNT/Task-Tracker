import { Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable} from "rxjs";
import { Task } from '../Models/task';
import { UserInfo } from '../Models/user-info';

@Injectable({
  providedIn: 'root'
})
export class ReportService 
{
  constructor(private httpClient: HttpClient) { }

  path = 'https://46odim7l6f.execute-api.us-east-2.amazonaws.com/beta';


  getTaskByDateAndId(id, date): Observable<Task[]> 
  {
    return this.httpClient.get<Task[]>(`${this.path}/task?userid=${id}&date=${date}`);
  }

  //test function - need endpoint for grabbing all dates
  getTasks(): Observable<Task[]>
  { 
    return this.httpClient.get<Task[]>(`${this.path}/task/`);
  }

  //test function - need endpoint for grabbing all user objects
  getUsers(): Observable<UserInfo[]>
  {
    return this.httpClient.get<UserInfo[]>(`${this.path}/id/`);
  } 

}