import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { TASKS } from '../mock-tasks';
import { Task } from '../Task';

const httpOptions={
  headers:new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl="http://127.0.0.1:8080/getallproducts"
  constructor(private http:HttpClient) { }

  // getTasks():Observable<Task[]>
  // {
  //   const tasks=of(TASKS)
  //   return tasks;
  // }

  getTasks():Observable<Task[]>
  {
    return this.http.get<Task[]>(this.apiUrl);
  }

  deleteTask(task:Task):Observable<Task>
  {
    const url=`${this.apiUrl}/${task.p_id}`
    return this.http.delete<Task>(url);
  }

  updateReminderTask(task:Task):Observable<Task>
  {
    const url=`${this.apiUrl}/${task.p_id}`
    return this.http.put<Task>(url,task,httpOptions);
  }

  addTask(task:Task):Observable<Task>{
    return this.http.post<Task>(this.apiUrl,task,httpOptions);
  }
}
