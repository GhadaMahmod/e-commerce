
import { CommonModule, Location } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Subscription, catchError, tap } from 'rxjs';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
@Component({
  standalone: true,
  imports: [
    // Modules
    ReactiveFormsModule,
    CheckboxModule,
    PasswordModule,
    CommonModule,
    RouterModule,
    FormsModule
  ],
  selector: 'forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  private subscriptions: Subscription[] = [];
  showError: boolean = false;
  errMsg: string = '';

  forgetPasswordForm = this.fb.group({
    email: ['', { validators: [Validators.required], updateOn: 'blur' }],
  });
  get formControls(): any {
    return this.forgetPasswordForm?.controls;
  }

  constructor(
    private authService: AuthService,
    private location: Location,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }


  // Start Login Functions
  loginNow(): void {
    if (this.forgetPasswordForm?.valid) {
      let data = {
        email: this.forgetPasswordForm?.value?.email,
      };
      //Send Request to login
      this.authService?.forgetPassword(data)?.pipe(
        tap(res => (this.handleSuccessForgotPasswords(res))),
        catchError(err => this.handleError(err))
      ).subscribe();
    }
  }

  handleSuccessForgotPasswords(res: any): void {
    if (res.statusMsg == 'fail') {
      this.errMsg = res.message;
      this.showError = true;
    } else {
      this.router.navigate(['/Home']);
    }
  }
  handleError(err: any): any {
    this.errMsg = err.message;
    this.showError = true;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription && subscription.closed) {
        subscription.unsubscribe();
      }
    });
  }
}
