import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }

        return false;
      });
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task: Task) => task.id === id);
  }

  patchTaskStatus(status: TaskStatus, id: string) {
    const taskIndex = this.tasks.findIndex((task: Task) => task.id === id);
    if (taskIndex === -1) {
      throw new NotFoundException('Task not found.');
    }
    this.tasks[taskIndex].status = status;
    return this.tasks[taskIndex];
  }

  deleteTaskById(id: string): void {
    const taskIndex = this.tasks.findIndex((task: Task) => task.id === id);

    if (taskIndex === -1) {
      throw new NotFoundException('Task not found.');
    }

    this.tasks.splice(taskIndex, 1);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }
}
