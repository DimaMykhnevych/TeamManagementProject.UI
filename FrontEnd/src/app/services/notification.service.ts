import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

const DEFAULT_DURATION = 4000;
const DEFAULT_ACTION = 'OK';
const CSS_CLASSNAME = 'snackBar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private snackBarService: MatSnackBar) { }

  public displayMessage(message: string, duration?: number, action?: string): void {
    this.snackBarService.open(message, action ?? DEFAULT_ACTION, {
      duration: duration ?? DEFAULT_DURATION,
      panelClass: [ CSS_CLASSNAME ]
    });
  }
}
