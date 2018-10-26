import { Component, OnInit } from '@angular/core';
import { TasksList } from '../models/task-list.model';
import { TasksService } from '../services/tasks-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details-task',
  templateUrl: './details-task.page.html',
  styleUrls: ['./details-task.page.scss'],
})
export class DetailsTaskPage implements OnInit {
  task: TasksList;
  id: string;

  constructor(private taskService: TasksService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.taskService.getDetailsTask(this.id)
      .subscribe(data => {
        this.task = data;
      })
  }

  delete(id: string) {
    this.taskService.deleteCar(id)
      .subscribe((data) => {
        this.router.navigateByUrl('/');
      })
  }
}
