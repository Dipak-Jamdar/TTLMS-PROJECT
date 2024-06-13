import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MasterService } from './services/master.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private masterService: MasterService, private router: Router) {}

  canActivate(): boolean {
    if (this.masterService.isLoggedIn()) {
      return true; // Allow access if user is logged in
    } else {
      this.router.navigate(['/login']); // Redirect to login page if not logged in
      return false;
    }
  }
}
