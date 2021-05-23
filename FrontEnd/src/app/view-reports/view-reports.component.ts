import { Component, OnInit } from '@angular/core';
import { MomentDateModule } from '@angular/material-moment-adapter';
import * as moment from 'moment';
import { __assign } from 'tslib';
import { DateModel } from '../models/DateModel';
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
  public datesDisplayed: Array<DateModel> = new Array<DateModel>();
  public dateChosen: Date;

  public isOpened: Array<boolean>;

  public open(index: number): void {
    this.isOpened[index] = true;
  }

  public close(index: number): void {
    this.isOpened[index] = false;
  }

  initializeDates(date: Date){
    this.dateChosen = date;
    this.datesDisplayed = new Array<DateModel>();
    for(let i = 0; i <= 2; i++){
      let dateModel = new DateModel();
      let datee = new Date();
      if(i < 1){
        datee.setDate(date.getDate() - (1 - i))
      }
      else if(i > 1) {
        datee.setDate(date.getDate() + (i - 1))
      }
      else {
        datee.setDate(date.getDate());
      }
      dateModel.date = datee;
      dateModel.dateName = ('0' + datee.getDate()).slice(-2) + '/'
      + ('0' + (datee.getMonth()+1)).slice(-2) + '/'
      + datee.getFullYear();
      this.datesDisplayed[i] = dateModel;
    }
  }

  constructor(private reportsService: ReportService) { }

  ngOnInit(): void {
    this.reportsService.get(new Date()).subscribe((reports: Array<Report>) => {
      this.reports = reports;
      this.isOpened = new Array<boolean>(reports.length).fill(false);
    })
    this.initializeDates(new Date());
  }

  formatDate(index: number){
    let rep = this.reports;
    let repp = this.reports[index];
    let repppp = repp.dateOfPublishing;
    let formattedDate = (moment(this.reports[index].dateOfPublishing)).format('DD-MMM-YYYY HH:mm:ss');

    return formattedDate;
  }

  click(index: number){
    this.reportsService.get(this.datesDisplayed[index].date).subscribe((reports: Array<Report>) => {
      this.reports = reports;
      this.isOpened = new Array<boolean>(reports.length).fill(false);
    })
    this.initializeDates(this.datesDisplayed[index].date);
  }

}
