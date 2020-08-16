import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  Req,
  ParseIntPipe,
  UseGuards,
  Inject,
} from '@nestjs/common';
import { TasksService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Request } from 'express';
import { Logger } from 'winston';
import { Task } from './task.entity';
import { TaskStatus } from './task-status-enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('/tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(
    @Inject('winston')
    private readonly logger: Logger,
    private taskService: TasksService,
  ) {}

  private logRequest(req: Request) {
    this.logger.info(`${req.method}: ${req.url}`);
  }
  private logData(data: any) {
    this.logger.info(`${data}`);
  }

  @Get()
  getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
    @GetUser() user: User,
    @Req() req: Request,
  ): Promise<Task[]> {
    this.logRequest(req);
    return this.taskService.getTasks(filterDto, user);
  }

  @Get('/:id')
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
    @Req() req: Request,
  ): Promise<Task> {
    this.logRequest(req);
    return this.taskService.getTaskById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  // createTask(@Body('title') title: string, @Body('description') description: string): Task {
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
    @Req() req: Request,
  ): Promise<Task> {
    this.logRequest(req);
    return this.taskService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  async deleteTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
    @Req() req: Request,
  ): Promise<void> {
    this.logRequest(req);
    return this.taskService.deleteTaskById(id, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User,
    @Req() req: Request,
  ): Promise<Task> {
    this.logRequest(req);
    return this.taskService.updateTaskStatus(id, status, user);
  }
}
