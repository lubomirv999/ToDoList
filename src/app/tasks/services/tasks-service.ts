import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, of } from "rxjs";

import { AddTask } from "../models/add-task-model";
import { TasksList } from "../models/task-list.model";
import { AuthService } from "../../auth/auth-service";

import * as firebase from 'firebase/app';
import 'firebase/database';

const baseUrl = 'https://todolist-42b37.firebaseio.com/tasks';

@Injectable({
    providedIn: 'root'
})

export class TasksService {
    constructor(private authService: AuthService, private http: HttpClient) { }

    getById(id: string) {
        return this.http.get<TasksList>(`${baseUrl}/${id}.json`);
    }

    getAllTasks(): Observable<TasksList[]> {
        const tasks: TasksList[] = [];
        firebase.database().ref("tasks").orderByChild("ownerId").equalTo(this.authService.getOwnerId()).limitToLast(30).on("child_added", function (snapshot) {
            tasks.push(new TasksList(snapshot.ref.key, snapshot.child('title').val(), snapshot.child('content').val(), snapshot.child('ownerId').val()));
        });

        return of(tasks);
    }

    getDetailsTask(id: string) {
        return this.http.get<TasksList>(`${baseUrl}/${id}/.json`);
    }

    addTask(body: AddTask) {
        return this.http.post(`${baseUrl}.json`, body);
    }

    editTask(body) {
        return this.http.patch(`${baseUrl}.json`, body);
    }

    deleteTask(id: string) {
        return this.http.delete(`${baseUrl}/${id}/.json`);
    }
}