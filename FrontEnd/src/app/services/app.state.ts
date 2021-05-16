import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppState {
   public articlesChanged = new BehaviorSubject<boolean>(true);
}
