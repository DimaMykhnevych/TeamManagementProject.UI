import { Option } from './Option';
export class Poll {
  public name: string;
  public doesAllowMultiple: boolean;
  public options: Array<Option>
  public createdByName: string;
  public id: string;
  public isMadeByUser: boolean;
}
