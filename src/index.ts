
import { Job } from './jobs/entities/job.entity';
import { Note } from './note/entities/note.entity';
import { Project } from './project/entities/project.entity';
import { Funding } from './project/fundings/entities/funding.entity';
import { User } from './users/entities/user.entity';

const entities = [User, Project, Note, Job, Funding];

export { User };
export { Project };
export { Note };
export { Job };
export { Funding };

export default entities;
