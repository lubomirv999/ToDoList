import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AlertController, PopoverController, ToastController, LoadingController } from '@ionic/angular';

import { AddTask } from '../models/add-task-model';
import { TasksService } from '../services/tasks-service';

import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.page.html',
  styleUrls: ['./edit-task.page.scss'],
})
export class EditTaskPage implements OnInit {
  id: string;
  bindingModel: AddTask = new AddTask('', '', firebase.auth().currentUser.uid);

  constructor(private route: ActivatedRoute, private alertController: AlertController, private loadingController: LoadingController, private location: Location, private popoverController: PopoverController, private tasksService: TasksService, private toastController: ToastController) { }

  ngOnInit() {
    this.popoverController.getTop().then(p => {
      if (p) {
        p.dismiss()
      }
    });

    this.presentDetailsLoader().then(p => p.present().then(
      () => {
        this.id = this.route.snapshot.params['id'];
        this.tasksService.getById(this.id)
          .subscribe((data) => {
            this.bindingModel = data;
            this.loadingController.getTop().then(l => l.dismiss());
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
      }));
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
        this.presentEditTaskToast();
        this.location.back();
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

  async presentEditTaskToast() {
    const toast = await this.toastController.create({
      message: 'You have successfully edited task!',
      duration: 2000,
      position: 'top',
      translucent: true,
      showCloseButton: true,
      cssClass: 'success-toast'
    });

    toast.present();
  }

  async presentDetailsLoader() {
    const loader = await this.loadingController.create({
      message: 'Loading...',
      animated: true,
      translucent: true
    });

    return await loader;
  }
}
