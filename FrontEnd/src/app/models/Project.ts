import { Company } from './Company';

export class Project {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  projectDescription: string;
  // teamProjects: TeamProjects[];
  companyId: string;
  company: Company;
}
