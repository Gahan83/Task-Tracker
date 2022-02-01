import { Component, OnInit } from '@angular/core';

import { TaskService } from '../../services/task.service';
import { TASKS } from '../../mock-tasks';
import { Task } from '../../Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  constructor(private taskService:TaskService) { }

  ngOnInit(): void {
   this.taskService.getTasks().subscribe((tasks)=>{
     this.tasks=tasks
   });
  }

  deleteTask(task:Task){
    this.taskService.deleteTask(task).subscribe(
      ()=>{
      this.tasks=this.tasks.filter(
        (t)=>t.p_id !== task.p_id);
    })
  }

  reminderTask(task:Task){
    task.reminder=!task.reminder;
    this.taskService.updateReminderTask(task).subscribe()
  }

  addTask(task:Task){
    this.taskService.addTask(task).subscribe((task:any)=>{
      this.tasks.push(task);
    });
  }

}
