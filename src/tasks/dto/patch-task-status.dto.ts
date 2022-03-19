import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class PatchTaskStatusDto {
  @IsEnum(TaskStatus)
  @ApiProperty({
    enum: Object.values(TaskStatus),
  })
  status: TaskStatus;
}
