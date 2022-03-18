import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class PatchTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
