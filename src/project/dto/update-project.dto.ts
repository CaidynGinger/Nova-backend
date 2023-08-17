import { PartialType } from '@nestjs/mapped-types';
import { ProjectCreateRequest } from './create-project.dto';

export class UpdateProjectDto extends PartialType(ProjectCreateRequest) {}
