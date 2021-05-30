import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserModel } from 'src/app/models/UserModel';
import { UpdateEmployeeDialogComponent } from '../dialogs/update-employee-dialog/update-employee-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  public openJourneyDetailsDialog(
    data: UserModel
  ): MatDialogRef<UpdateEmployeeDialogComponent> {
    return this.dialog.open(UpdateEmployeeDialogComponent, {
      data: data,
      width: '900px',
    });
  }
}
