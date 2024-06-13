import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginAuthServiceService } from '../login-auth-service.service';
import jwt_decode, { jwtDecode } from 'jwt-decode';
import { MasterService } from '../services/master.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private auth: LoginAuthServiceService, private router: Router, private masterService:MasterService) {}

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      // Redirect the user to the appropriate route if already logged in
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken: any = jwtDecode(token);
        this.navigateBasedOnRole(decodedToken.roles, decodedToken.sub);
      }
    }
  }

  login(): void {
    if (this.LoginForm.valid) {
      const { email, password } = this.LoginForm.value as { email: string, password: string };
      this.auth.login({ email, password }).subscribe(
        (result: any) => {
          const token = result.access_token;
          localStorage.setItem('token', token); // Store token in local storage

          const decodedToken: any = jwtDecode(token);
          this.navigateBasedOnRole(decodedToken.roles, decodedToken.sub);
        },
        (err: Error) => {
          alert(err.message); // Handle login error
        }
      );
    }
  }

  navigateBasedOnRole(roles: string[], userId: string): void {
    if (roles.includes('Admin')) {
      this.masterService.setAdminId(userId)

      // alert(userId)
      this.router.navigate([`/leave-management/admin-dashboard`]);
    } else if (roles.includes('user'||'tester'||'developer'||'intern'||'designer'||'analyst')) {
      this.masterService.setUserId(userId)

      // alert(userId)
      this.router.navigate([`/leave-management/employee-dashboard`]);
    } else {
      alert('Unknown role');
    }
  }
}
