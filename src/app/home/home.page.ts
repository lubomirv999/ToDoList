import { Component } from '@angular/core';
import { TasksList } from '../models/task-list.model';
import { TasksService } from '../services/tasks-service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tasks: TasksList[];
  navigationSubscription;

  constructor(private tasksService: TasksService, private route: ActivatedRoute, private router: Router, private alertController: AlertController, private _location: Location, private popoverController: PopoverController) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        if (e.url === '/home' || e.url === '' || e.url === '/')
          this.initialData();
      }
    });
  }

  initialData() {
    this.tasksService.getAllTasks()
      .subscribe((res) => {
        this.popoverController.getTop().then(p => p.dismiss());

        this.tasks = res;
      },
        (err) => {
          this.alertController.create({
            header: 'Error!',
            message: `${JSON.stringify(err.message)}`,
            buttons: [
              {
                text: 'Dismiss',
                handler: () => {
                  this._location.back();
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
}
