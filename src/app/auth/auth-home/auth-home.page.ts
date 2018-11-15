import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AlertController, PopoverController, LoadingController } from '@ionic/angular';
import { Location } from '@angular/common';

import { PopoverHomePage } from '../popover-home/popover-home.page';
import { TasksList } from '../../tasks/models/task-list.model';
import { AuthService } from '../auth-service';
import { TasksService } from '../../tasks/services/tasks-service';

@Component({
  selector: 'app-auth-home',
  templateUrl: './auth-home.page.html',
  styleUrls: ['./auth-home.page.scss'],
})
export class AuthHomePage {
  tasks: TasksList[];
  navigationSubscription;

  constructor(private alertController: AlertController, private authService: AuthService, private loadingController: LoadingController, private location: Location, private popoverController: PopoverController, private router: Router, private tasksService: TasksService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        if (e.url === '/auth-home') {
          this.initialData();
        }
      }
    });
  }

  initialData() {
    this.presentHomeLoader().then(p => p.present().then(
      () =>
        this.authService.getOwnerId().then((uid) => {
          this.tasksService.getAllTasks(uid).subscribe((res) => {
            this.popoverController.getTop().then(p => {
              if (p) {
                p.dismiss();
              }
            });

            this.tasks = res;
            this.loadingController.getTop().then(l => l.dismiss());
          })
        }),
      (err) => {
        this.alertController.create({
          header: 'Error!',
          message: `${JSON.stringify(err.message)}`,
          buttons: [
            {
              text: 'Dismiss',
              handler: () => {
                this.location.back();
              }
            }
          ]
        }).then(a => a.present());
      }))
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  async presentHomePopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverHomePage,
      componentProps: { logout: () => this.authService.logout() },
      event: ev,
      translucent: true
    });

    return await popover.present();
  }

  async presentHomeLoader() {
    const loader = await this.loadingController.create({
      message: 'Loading...',
      animated: true,
      translucent: true,
    });

    return await loader;
  }
}
