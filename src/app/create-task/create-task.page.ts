import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddTask } from '../models/add-task-model';
import { TasksService } from '../services/tasks-service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.page.html',
  styleUrls: ['./create-task.page.scss'],
})
export class CreateTaskPage implements OnInit {
  bindingModel: AddTask;

  constructor(private router: Router, private tasksService: TasksService) {
    this.bindingModel = new AddTask("", "");
  }

  ngOnInit() {
  }

  add() {
    if (this.tasksService.addTask(this.bindingModel)) {
      this.router.navigateByUrl("/");
    } else {
      this.router.navigateByUrl("/");
    }
  }
}
