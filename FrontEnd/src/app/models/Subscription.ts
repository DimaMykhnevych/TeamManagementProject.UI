import { Company } from './Company';

export class Subscription {
  id: string;
  startDate: Date;
  expirationDate: Date;
  transactionId: string;
  //   transaction: Transaction;
  company: Company;
  //   subscriptionPlan: SubscriptionPlan;
}
