import { Component, OnInit } from '@angular/core';
import { IdentityService } from '../services/identity.service';
import { UserModel } from '../models/UserModel';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  fullName: string;
  searchForm: FormGroup;
  
  constructor(private identityService : IdentityService, 
    private router: Router, private route: ActivatedRoute,
    formBuilder: FormBuilder) {
      this.searchForm = formBuilder.group({
        'search': ''
      })
    }

  ngOnInit(): void {
    this.identityService.getUser().subscribe({
      next: (user: UserModel) => this.fullName = user.fullName,
      error: () => this.fullName = null
    });
  }

  onSubmit() {
    const searchValue = this.searchForm.value['search'];
    this.router.navigate(
      [], 
      {
        relativeTo: this.route,
        queryParams: { 'search': searchValue },
        queryParamsHandling: 'merge'
      });
  }
}
