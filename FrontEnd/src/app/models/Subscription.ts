import { Company } from './Company';
import { SubscriptionPlan } from './SubscriptionPlan';
import { Transaction } from './Transaction';

export class Subscription {
  id: string;
  startDate: Date;
  expirationDate: Date;
  transactionId: string;
  transaction: Transaction;
  company: Company;
  subscriptionPlanId: string;
  subscriptionPlan: SubscriptionPlan;
}
