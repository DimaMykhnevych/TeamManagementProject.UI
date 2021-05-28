import { UserEventModel } from './UserEventModel';
export class GetEventModel {
  public title: string;
  public url: string;
  public description: string;
  public passcode: string;
  public attendies: Array<UserEventModel>;
  public dateTime: Date;
  public createdByName: string;
  public id: string;
  public isMadeByUser: boolean;
}
