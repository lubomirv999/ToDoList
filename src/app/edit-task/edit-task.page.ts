import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AddTask } from '../models/add-task-model';
import { TasksService } from '../services/tasks-service';
import { Location } from '@angular/common';
import { AlertController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.page.html',
  styleUrls: ['./edit-task.page.scss'],
})
export class EditTaskPage implements OnInit {
  id: string;
  bindingModel: AddTask = new AddTask('', '');

  constructor(private route: ActivatedRoute, private tasksService: TasksService, private _location: Location, private alertController: AlertController, private popoverController: PopoverController) {
  }

  ngOnInit() {
    this.popoverController.getTop().then(p => p.dismiss());

    this.id = this.route.snapshot.params['id'];
    this.tasksService.getById(this.id)
      .subscribe((data) => {
        this.bindingModel = data;
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

  edit() {
    if (this.bindingModel.title.length <= 2 || this.bindingModel.title.length > 50 || this.bindingModel.content.length <= 2 || this.bindingModel.content.length > 150) {
      return;
    }

    const body = {
      [this.id]: this.bindingModel
    }

    this.tasksService.editTask(body)
      .subscribe(() => {
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
