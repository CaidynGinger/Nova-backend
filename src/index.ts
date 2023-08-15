import { Note } from './project/entities/notes.entity';
import { Project } from './project/entities/project.entity';
import { User } from './users/entities/user.entity';

const entities = [User, Project, Note];

export { User };
export { Project };
export { Note };

export default entities;
