import { Company } from './Company';
import { UserModel } from './UserModel';
import { Poll } from './Poll';
import { TeamProject } from './TeamProject';

export class Team {
  id: string;
  teamName: string;
  members: UserModel[];
  companyId: string;
  company: Company;
  teamProjects: TeamProject[];
  polls: Poll[];
}
