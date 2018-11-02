import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TasksList } from '../models/task-list.model';
import { TasksService } from '../services/tasks-service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  tasks: Observable<TasksList[]>;
  navigationSubscription;

  constructor(private tasksService: TasksService, private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initialData();
      }
    });    
  }

  initialData() {
    this.tasks = this.tasksService.getAllTasks();
  }

  ngOnInit() {
    this.tasks = this.tasksService.getAllTasks();
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
}
