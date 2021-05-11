import { FormGroup } from '@angular/forms';
import { Tag } from '../models/Tag';
export interface IArticleOperation {
  config: object;
  title: string;
  articleForm: FormGroup;
  tags: Array<Tag>;
  saving: boolean;
  save(form: any): void;
  openDialog(): void;
}
