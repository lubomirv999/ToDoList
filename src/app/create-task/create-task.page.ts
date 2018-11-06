import { Component } from '@angular/core';
import { AddTask } from '../models/add-task-model';
import { TasksService } from '../services/tasks-service';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.page.html',
  styleUrls: ['./create-task.page.scss'],
})
export class CreateTaskPage {
  bindingModel: AddTask = new AddTask('', '');;

  constructor(private alertController: AlertController, private _location: Location, private tasksService: TasksService) {
  }

  add() {
    if (this.bindingModel.title.length <= 2 || this.bindingModel.title.length > 50 || this.bindingModel.content.length <= 2 || this.bindingModel.content.length > 150) {
      return;
    }

    this.tasksService.addTask(this.bindingModel).subscribe(() => {
      this._location.back();
    }, (err) => {
      this.alertController.create({
        header: JSON.stringify(err.name),
        message: `${JSON.stringify(err.statusText)}`,
        buttons: [
          {
            text: 'Dismiss',
            handler: () => {
            }
          }
        ]
      }).then(a => a.present());
    });
  }
}
