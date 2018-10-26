import { Component, OnInit, NgZone } from '@angular/core';
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

  constructor(private router: Router, private tasksService: TasksService, private zone: NgZone) {
    this.bindingModel = new AddTask("", "");
  }

  ngOnInit() {
  }

  add() {
    let title = this.bindingModel.title;
    let content = this.bindingModel.content;

    if (title.length <= 2 || title.length > 50 || content.length <= 2 || content.length > 150) {
      this.router.navigateByUrl('/create-task');
    }

    this.tasksService.addTask(this.bindingModel).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}
