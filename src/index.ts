
import { Fund } from './funds/entities/fund.entity';
import { Job } from './jobs/entities/job.entity';
import { Note } from './note/entities/note.entity';
import { Project } from './project/entities/project.entity';
import { User } from './users/entities/user.entity';

const entities = [User, Project, Note, Job, Fund];

export { User };
export { Project };
export { Note };
export { Job };
export { Fund };

export default entities;
