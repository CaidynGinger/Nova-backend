
import { Job } from './jobs/entities/job.entity';
import { Note } from './note/entities/note.entity';
import { Project } from './project/entities/project.entity';
import { User } from './users/entities/user.entity';

const entities = [User, Project, Note, Job];

export { User };
export { Project };
export { Note };
export { Job };

export default entities;
