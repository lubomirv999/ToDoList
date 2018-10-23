import { Injectable } from "@angular/core";
import { AddTask } from "../models/add-task-model";

@Injectable({
    providedIn: 'root'
})

export class TasksService {
    constructor() { }

    addTask(body: AddTask) {
        if (body.title.length <= 2 || body.title.length > 50 || body.content.length <= 2 || body.content.length > 150) {
            return false;
        }

        console.log(body.title);
        console.log(body.content);

        return true;
    }
}