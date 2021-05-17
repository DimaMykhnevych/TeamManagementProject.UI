import { Subscription } from './Subscription';

export class SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  projectsQuantity: number;
  teamsQuantity: number;
  description: string;
  subscription: Subscription;
}
