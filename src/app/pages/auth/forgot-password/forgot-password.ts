import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-forgot-password',
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule
  ],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
  providers: [MessageService],
})
export class ForgotPassword {
  email = '';
  loading = false;

  constructor(
    private router: Router,
    private messageService: MessageService
  ) {}

  submit(): void {
    if (!this.email) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation',
        detail: 'Email is required'
      });
      return;
    }

    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Email Sent',
        detail: 'Password reset link sent'
      });

      this.router.navigate(['auth/login']);
    }, 1000);
  }

  backToLogin(): void {
    this.router.navigate(['auth/login']);
  }
}
