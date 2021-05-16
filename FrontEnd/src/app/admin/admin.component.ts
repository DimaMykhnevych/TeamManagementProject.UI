import { Component, OnInit, ViewChild } from '@angular/core';
import { UserModel } from '../models/UserModel';
import { IdentityService } from '../services/identity.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NotificationService } from './../services/notification.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: Array<UserModel>;
  dataSource: MatTableDataSource<UserModel>;
  columnDefs: string[] = ['FullName', 'Email', 'MakeAdmin'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private identityService: IdentityService, private snackBar: MatSnackBar, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.identityService.getUsers().subscribe((users: Array<UserModel>) => {
      this.users = users;
      this.dataSource = new MatTableDataSource<UserModel>(this.users);
      this.dataSource.paginator = this.paginator;
    });
  }

  makeAdmin(idParameter: string): void {
    this.identityService.makeAdmin(idParameter).subscribe(
      (successResult) => {
        this.notificationService.displayMessage('Admin role has been granted to the user');
        this.users.find(user => user.id === idParameter).isAdmin = true;
      },
      (errorResponse: HttpErrorResponse) => this.notificationService.displayMessage(errorResponse.error));
  }
}
