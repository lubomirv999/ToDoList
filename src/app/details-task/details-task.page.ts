import { Component } from '@angular/core';
import { TasksList } from '../models/task-list.model';
import { TasksService } from '../services/tasks-service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { Location } from '@angular/common';
import { PopoverPage } from '../popover/popover.page';

@Component({
  selector: 'app-details-task',
  templateUrl: './details-task.page.html',
  styleUrls: ['./details-task.page.scss'],
})
export class DetailsTaskPage {
  task: TasksList;
  id: string;
  navigationSubscription;

  constructor(private route: ActivatedRoute, private alertController: AlertController, private _location: Location, private popoverController: PopoverController, private router: Router, private taskService: TasksService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        if (e.url.split('/')[1] === 'details-task') {
          this.initalData();
        }
      }
    });
  }

  initalData() {
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
                  this._location.back();
                }
              }
            ]
          }).then(a => a.present());
        }

        this.task = data;
      }, (err) => {
        this.alertController.create({
          header: JSON.stringify(err.name),
          message: `${JSON.stringify(err.statusText)}`,
          buttons: [
            {
              text: 'Dismiss',
              handler: () => {
                this._location.back();
              }
            }
          ]
        }).then(a => a.present());
      })
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
                  this._location.replaceState('');
                  this.router.navigateByUrl('');
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

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverPage,
      componentProps: { id: this.id, delete: (id) => this.delete(id) },
      event: ev,
      translucent: true,

    });

    return await popover.present();
  }
}
