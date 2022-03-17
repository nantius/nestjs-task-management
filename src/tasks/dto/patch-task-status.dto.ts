import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task.model';

export class PatchTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
