import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddTask } from '../models/add-task-model';
import { TasksService } from '../services/tasks-service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.page.html',
  styleUrls: ['./edit-task.page.scss'],
})
export class EditTaskPage implements OnInit {
  id: string;
  bindingModel: AddTask;

  constructor(private route: ActivatedRoute, private router: Router, private tasksService: TasksService) { }

  ngOnInit() {
    this.bindingModel = new AddTask('', '');
    this.id = this.route.snapshot.params['id'];
    this.tasksService.getById(this.id)
      .subscribe((data) => {
        this.bindingModel = data;
      })
  }

  edit() {
    const body = {
      [this.id]: this.bindingModel
    }

    this.tasksService.editCar(body)
      .subscribe(() => {
        this.router.navigateByUrl('/');
      })
  }
}
