import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export enum AccessDeniedReason {
  Unauthenticated,
  Unauthorized,
  Unknown
}

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.css']
})
export class AccessDeniedComponent implements OnInit {
  public reason: AccessDeniedReason;
  public readonly AccessDeniedReasonEnumRef = AccessDeniedReason;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: paramMap => {
        const reasonCode = Number(paramMap.get('reason').trim());

        // default value - AccessDeniedReason.Unknown
        this.reason = AccessDeniedReason.Unknown;
        if (AccessDeniedReason[reasonCode]) {
          this.reason = reasonCode;
        }
      }
    });
  }
}
