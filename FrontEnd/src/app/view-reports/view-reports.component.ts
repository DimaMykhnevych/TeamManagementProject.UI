import { Component, OnInit } from '@angular/core';
import { ReportRecord } from '../models/ReportRecord';
import { Report } from './../models/Report';
import { ReportService } from './../services/report.service';

@Component({
  selector: 'app-view-reports',
  templateUrl: './view-reports.component.html',
  styleUrls: ['./view-reports.component.css']
})
export class ViewReportsComponent implements OnInit {
  public reports: Array<Report>;

  public isOpened: Array<boolean>;

  public open(index: number): void {
    this.isOpened[index] = true;
  }

  public close(index: number): void {
    this.isOpened[index] = false;
  }

  constructor(private reportsService: ReportService) { }

  ngOnInit(): void {
    this.reportsService.get().subscribe((reports: Array<Report>) => {
      this.reports = reports;
    })
  }

}
