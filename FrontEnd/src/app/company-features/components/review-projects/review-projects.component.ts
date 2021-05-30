import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Project } from 'src/app/models/Project';
import { ProjectUpdateModel } from 'src/app/models/ProjectUpdateModel';
import { DialogService } from '../../services/dialog.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-review-projects',
  templateUrl: './review-projects.component.html',
  styleUrls: ['./review-projects.component.css'],
})
export class ReviewProjectsComponent implements OnInit {
  public projects: Project[];
  constructor(
    private _projectService: ProjectService,
    private _dialogService: DialogService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getProjects().subscribe((resp) => {
      this.projects = resp;
    });
  }

  public onEditButtonClick(id: string): void {
    const project = this.projects.find((e) => e.id === id);
    this._dialogService
      .openPorjectEditDialog(project)
      .afterClosed()
      .pipe(
        switchMap((updatedProject) => {
          if (updatedProject) {
            updatedProject.id = id;
            updatedProject.startDate = this.convertDateToRightFormat(
              new Date(updatedProject.startDate)
            );
            updatedProject.endDate = this.convertDateToRightFormat(
              new Date(updatedProject.endDate)
            );
            return this.updateProject(updatedProject);
          }
          return of(null);
        })
      )
      .subscribe((resp) => {
        if (resp) {
          this.projects = resp;
          this._toastr.success('Project was updated successfully');
        }
      });
  }

  public updateProject(project: ProjectUpdateModel): Observable<Project[]> {
    return this._projectService.updateProject(project).pipe(
      switchMap(() => {
        return this.getProjects();
      })
    );
  }

  public onDeleteButtonClick(id: string): void {}

  public getProjects(): Observable<Project[]> {
    return this._projectService.getAllProjects();
  }

  private convertDateToRightFormat(date: Date): Date {
    if (typeof date === 'string') {
      return date;
    }
    let utcDate = new Date(
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes()
      )
    );
    return utcDate;
  }
}
