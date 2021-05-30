import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserModel } from 'src/app/models/UserModel';
import { UpdateEmployeeDialogComponent } from '../dialogs/update-employee-dialog/update-employee-dialog.component';
import { IDialogInfo } from '../../models/DialogInfo';
import { ConfirmationDialogComponent } from '../dialogs/confirmation-dialog/confirmation-dialog.component';
import { UpdateProjectDialogComponent } from '../dialogs/update-project-dialog/update-project-dialog.component';
import { Project } from 'src/app/models/Project';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  public openUpdateEmployeeDialog(
    data: UserModel
  ): MatDialogRef<UpdateEmployeeDialogComponent> {
    return this.dialog.open(UpdateEmployeeDialogComponent, {
      data: data,
      width: '900px',
    });
  }

  public openConfirmDialog(
    data: IDialogInfo
  ): MatDialogRef<ConfirmationDialogComponent> {
    return this.dialog.open(ConfirmationDialogComponent, {
      width: '390px',
      disableClose: true,
      data: data,
    });
  }

  public openPorjectEditDialog(
    data: Project
  ): MatDialogRef<UpdateProjectDialogComponent> {
    return this.dialog.open(UpdateProjectDialogComponent, {
      data: data,
      width: '800px',
    });
  }
}
