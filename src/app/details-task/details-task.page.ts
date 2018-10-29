import { Component, OnInit } from '@angular/core';
import { TasksList } from '../models/task-list.model';
import { TasksService } from '../services/tasks-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-details-task',
  templateUrl: './details-task.page.html',
  styleUrls: ['./details-task.page.scss'],
})
export class DetailsTaskPage implements OnInit {
  task: TasksList;
  id: string;

  constructor(private alertController: AlertController, private taskService: TasksService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.taskService.getDetailsTask(this.id)
      .subscribe(data => {
        this.task = data;
      })
  }

  delete(id: string) {
    let alert = this.alertController.create({
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
            this.taskService.deleteCar(id)
              .subscribe((data) => {
                this.router.navigateByUrl('/');
              })
          }
        }
      ]
    }).then(a => a.present());
  }
}
