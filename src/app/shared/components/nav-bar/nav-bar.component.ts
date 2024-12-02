import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent implements OnDestroy, OnInit {
  protected authService = inject(AuthService);
  protected router = inject(Router);

  userName: string | null = null;
  private subscription  = new Subscription();

  ngOnInit(): void {
    this.subscription  = this.authService.currentUser$.subscribe((user) => {
      this.userName = user?.name || null;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
