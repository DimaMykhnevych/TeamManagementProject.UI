import { Project } from './Project';
import { Subscription } from './Subscription';
import { Team } from './Team';
import { UserModel } from './UserModel';

export class Company {
  id: string;
  name: string;
  domain: string;
  address: string;
  phone: string;
  subscriptionId: string;
  subscription: Subscription;
  ceoId: string;
  firstName: string;
  lastName: string;
  ceoEmail: string;
  ceoPassword: string;
  CEO: UserModel;
  teams: Team[];
  projects: Project[];
}
