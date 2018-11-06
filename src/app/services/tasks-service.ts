import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AddTask } from "../models/add-task-model";
import { TasksList } from "../models/task-list.model";

const baseUrl = 'https://todolist-42b37.firebaseio.com/tasks';

@Injectable({
    providedIn: 'root'
})

export class TasksService {
    constructor(private http: HttpClient) { }

    getById(id: string) {
        return this.http.get<TasksList>(`${baseUrl}/${id}.json`);
    }

    getAllTasks() {
        return this.http.get(`${baseUrl}.json`)
            .pipe(map((res: Response) => {
                const tasks: TasksList[] = [];

                if (res) {
                    const tasksIds = Object.keys(res);

                    for (const id of tasksIds) {
                        tasks.push(new TasksList(id, res[id].title, res[id].content));
                    }

                    return tasks;
                } else {
                    return tasks;
                }
            }));
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