import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenProvider } from '@wooportal/core';
import { BasePage } from '../base.page';

@Component({
  styleUrls: ['../base.page.scss', 'logout.page.scss'],
  templateUrl: 'logout.page.html'
})

export class LogoutPageComponent extends BasePage implements OnInit {

  protected path: string = 'logout';

  public constructor(
    private router: Router,
    private tokenProvider: TokenProvider
  ) {
    super();
  }

  public ngOnInit(): void {
    this.tokenProvider.remove();
    this.router.navigate(['/']);
  }

}
