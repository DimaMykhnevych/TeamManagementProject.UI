import { Project } from './Project';
import { Team } from './Team';

export interface TeamProject {
  id: string;
  teamId: string;
  projectId: string;

  Team: Team;
  Project: Project;
}
