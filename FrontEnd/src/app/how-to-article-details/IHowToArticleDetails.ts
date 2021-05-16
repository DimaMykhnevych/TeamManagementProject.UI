import { FormGroup } from '@angular/forms';

export interface IHowToArticleDetails {
    title: string;
    form: FormGroup;
    processing: boolean;
    onSave: () => void;
}
