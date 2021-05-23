import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Report } from '../models/Report';
import { ReportRecord } from '../models/ReportRecord';
import { NotificationService } from '../services/notification.service';
import { ReportService } from './../services/report.service';

@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.css']
})
export class CreateReportComponent implements OnInit {
  public resolved: Array<ReportRecord> = new Array<ReportRecord>();
  public saving = false;
  reportForm: FormGroup;
  public codeReview: Array<ReportRecord> = new Array<ReportRecord>();
  public active: Array<ReportRecord> = new Array<ReportRecord>();
  add(listName: string): void {
    switch(listName){
      case 'resolved' : this.resolved.push(new ReportRecord()); break;
      case 'codeReview' : this.codeReview.push(new ReportRecord()); break;
      case 'active' : this.active.push(new ReportRecord()); break;
    }
  }

  trackByresolved(index: number, obj: any): any {
    return index + obj + "resolved";
  }
  trackBycr(index: number, obj: any): any {
    return index + obj + "codeReview";
  }
  trackByactive(index: number, obj: any): any {
    return index + obj + "active";
  }

  delete(listName:string, index: number):void {
    switch(listName){
      case 'resolved' : this.resolved.splice(index, 1); break;
      case 'codeReview' : this.codeReview.splice(index, 1); break;
      case 'active' : this.active.splice(index, 1); break;
    }

    let i = 5;
  }
  constructor(private reportsService: ReportService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.codeReview.push(new ReportRecord());
    this.resolved.push(new ReportRecord());
    this.active.push(new ReportRecord());
    this.reportForm = this.formBuilder.group({
      additionalComment: new FormControl(''),
    });
  }

  save(form) {
    if (!form.valid) {
      return;
    }

    this.saving = true;
    const report: Report = this.reportForm.value;
    report.codeReview = this.codeReview.map(c => c.value);
    report.resolved = this.resolved.map(c => c.value);
    report.active = this.active.map(c => c.value);
    let message: string;

    this.reportsService
      .create(report)
      .pipe(
        finalize(() => {
          this.saving = false;
          this.notificationService.displayMessage(message);
        })
      )
      .subscribe({
        next: () => {
          message = 'The poll was successfully saved!';
          this.router.navigateByUrl(`/home`);
        },
        error: (errors: HttpErrorResponse) => {
          if (errors.error !== undefined) {
            message = Object.values(errors.error).join(', ');
          } else {
            message = 'Internal server error. Please, try again later';
          }
        },
      });
  }

}
