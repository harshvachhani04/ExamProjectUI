import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../service/auth-service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  providers: [MessageService]
})
export class Login {

  username = '';
  password = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  // =============================
  // 🔐 LOGIN (JWT BASED)
  // =============================
  login(): void {

    if (!this.username || !this.password) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation',
        detail: 'Username and password are required'
      });
      return;
    }

    this.loading = true;

    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.loading = false;

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Login successful'
        });

        this.router.navigate(['/pages/test']);
      },
      error: () => {
        this.loading = false;

        this.messageService.add({
          severity: 'error',
          summary: 'Login Failed',
          detail: 'Invalid username or password'
        });
      }
    });
  }

  // =============================
  // 🔁 FORGOT PASSWORD
  // =============================
  goToForgotPassword(): void {
    this.router.navigate(['/auth/forgot-password']);
  }
}