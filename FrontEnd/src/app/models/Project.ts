import { Company } from './Company';
import { TeamProject } from './TeamProject';

export class Project {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  projectDescription: string;
  teamProjects: TeamProject[];
  companyId: string;
  company: Company;
}
