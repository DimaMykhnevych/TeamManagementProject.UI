import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from '../models/Team';
import { TeamService } from './../company-features/services/team.service';

@Component({
  selector: 'app-choose-edit-team',
  templateUrl: './choose-edit-team.component.html',
  styleUrls: ['./choose-edit-team.component.css'],
})
export class ChooseEditTeamComponent implements OnInit {
  teams: Array<Team>;
  chosedTeam: string;

  constructor(private teamService: TeamService, private router: Router) {}

  ngOnInit(): void {
    this.teamService.getTeams().subscribe((resp) => {
      this.teams = resp.filter((t) => t.teamName);
    });
  }

  choose() {
    this.router.navigateByUrl(
      '/company-features/edit-team?id=' + this.chosedTeam
    );
  }
}
