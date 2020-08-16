import { Injectable, NotFoundException } from '@nestjs/common';
// import { IdGenerator } from '../../utils/IdGenerator';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './task-status-enum';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository, // private idGenerator: IdGenerator
  ) {}

  /* Get all tasks */
  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    // return this.taskRepository.find();
    return this.taskRepository.getTasks(filterDto, user);
  }

  /* Get task by Id */
  async getTaskById(id: number, user: User): Promise<Task> {
    const tasks = await this.taskRepository.findOne({ where: { id, userId: user.id } });

    if (!tasks) {
      throw new NotFoundException(`Task with ID '${id}' not found`);
    }
    return tasks;
  }

  /* Create a new task */
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  /* Delete task by Id */
  async deleteTaskById(id: number, user: User): Promise<void> {
    const result = await this.taskRepository.delete({ id, userId: user.id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID '${id}' not found`);
    }
  }

  /* Update task status by id */
  async updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await task.save();
    return task;
  }
}
