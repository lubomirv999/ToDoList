import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AlertController, PopoverController, ToastController, LoadingController } from '@ionic/angular';
import { Location } from '@angular/common';

import { TasksList } from '../models/task-list.model';
import { TasksService } from '../services/tasks-service';
import { PopoverPage } from '../popover/popover.page';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-details-task',
  templateUrl: './details-task.page.html',
  styleUrls: ['./details-task.page.scss'],
})
export class DetailsTaskPage {
  navigationSubscription;
  task: TasksList;
  id: string;

  constructor(private route: ActivatedRoute, private alertController: AlertController, private loadingController: LoadingController, private location: Location, private popoverController: PopoverController, private router: Router, private socialSharing: SocialSharing, private taskService: TasksService, private toastController: ToastController) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        if (e.url.split('/')[1] === 'details-task') {
          this.initalData();
        }
      }
    });
  }

  initalData() {
    this.presentDetailsLoader().then(p => p.present().then(
      () => {
        this.id = this.route.snapshot.params['id'];
        this.taskService.getDetailsTask(this.id)
          .subscribe(data => {
            if (!data) {
              this.alertController.create({
                header: 'Error!',
                message: 'The task cannot be loaded or has been deleted!',
                buttons: [
                  {
                    text: 'Dismiss',
                    handler: () => {
                      this.location.back();
                    }
                  }
                ]
              }).then(a => a.present());
            }

            this.task = data;
            this.loadingController.getTop().then(l => l.dismiss());
          }, (err) => {
            this.alertController.create({
              header: JSON.stringify(err.name),
              message: `${JSON.stringify(err.statusText)}`,
              buttons: [
                {
                  text: 'Dismiss',
                  handler: () => {
                    this.location.back();
                  }
                }
              ]
            }).then(a => a.present());
          })
      }
    ))
  }

  delete(id: string) {
    if (this.task) {
      this.alertController.create({
        header: 'Delete Task?',
        message: 'Are you sure you want to delete the task?',
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
            }
          },
          {
            text: 'Delete',
            handler: () => {
              this.taskService.deleteTask(id)
                .subscribe(() => {
                  this.presentEditDeleteTaskToast()
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
                })
            }
          }
        ]
      }).then(a => a.present());
    }
  }

  share() {
    this.socialSharing.share(`Title: ${this.task.title}\, Content: ${this.task.content}`)
      .then(() => {
        this.presentShareTaskToast();
        this.location.back();
      }).catch(
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

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverPage,
      componentProps: { id: this.id, delete: (id) => this.delete(id), share: () => this.share() },
      event: ev,
      translucent: true,

    });

    return await popover.present();
  }

  async presentEditDeleteTaskToast() {
    const toast = await this.toastController.create({
      message: 'You have successfully deleted task!',
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

  async presentShareTaskToast() {
    const toast = await this.toastController.create({
      message: 'You have successfully shared the desired task!',
      duration: 2000,
      position: 'top',
      translucent: true,
      showCloseButton: true,
      cssClass: 'success-toast'
    });

    toast.present();
  }
}
