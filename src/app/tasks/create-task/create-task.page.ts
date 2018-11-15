import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AlertController, ToastController } from '@ionic/angular';

import { AddTask } from '../models/add-task-model';
import { TasksService } from '../services/tasks-service';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import { AuthService } from '../../auth/auth-service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.page.html',
  styleUrls: ['./create-task.page.scss'],
})
export class CreateTaskPage {
  bindingModel: AddTask = new AddTask('', '', firebase.auth().currentUser.uid);

  constructor(private alertController: AlertController, private authService: AuthService, private location: Location, private tasksService: TasksService, private toastController: ToastController) {
    this.authService.getOwnerId().then(uid => {
      this.tasksService.getAllTasks(uid).subscribe((res) => {
        if (res.length === 30) {
          this.alertController.create({
            header: 'Maximum capacity reached!',
            message: 'You have reached your maximum capacity of 30 tasks!',
            buttons: [
              {
                text: 'Dismiss',
                handler: () => {
                  this.location.back();
                }
              }
            ]
          }).then(a => a.present());
        };
      })
    });
  }

  add() {
    if (this.bindingModel.title.length <= 2 || this.bindingModel.title.length > 50 || this.bindingModel.content.length <= 2 || this.bindingModel.content.length > 150) {
      return;
    }

    this.tasksService.addTask(this.bindingModel).subscribe(() => {
      this.presentSuccessCreateTaskToast();
      this.location.replaceState('auth-home');
      this.location.go('auth-home');
      this.location.back();
    },
      (err) => {
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

  async presentSuccessCreateTaskToast() {
    const toast = await this.toastController.create({
      message: 'You have successfully created task!',
      duration: 2000,
      position: 'top',
      translucent: true,
      showCloseButton: true,
      cssClass: 'success-toast'
    });

    toast.present();
  }
}
