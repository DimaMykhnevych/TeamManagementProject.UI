import { UserModel } from './UserModel';
export class EventModel {
  public title: string;
  public url: string;
  public description: string;
  public passcode: string;
  public attendies: Array<UserModel>;
  public dateTime: Date;
}
