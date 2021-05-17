import { Subscription } from './Subscription';

export class Transaction {
  id: string;
  publicKey: string;
  transactionDate: Date;
  subscription: Subscription;
}
