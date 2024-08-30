
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
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private subscriptions: Subscription[] = [];
  showError: boolean = false;
  errMsg: string = '';

  loginForm = this.fb.group({
    email: ['', { validators: [Validators.required], updateOn: 'blur' }],
    password: ['', { validators: Validators.required, updateOn: 'blur' }],
    remember: [false, []],
  });
  get formControls(): any {
    return this.loginForm?.controls;
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
    if (this.loginForm?.valid) {
      let data = {
        email: this.loginForm?.value?.email,
        password: this.loginForm?.value?.password,
      };
      //Send Request to login
      this.authService?.login(data)?.pipe(
        tap(res => (this.handleSuccessLoggedIn(res))),
        catchError(err => this.handleError(err))
      ).subscribe();
    }
  }

  handleSuccessLoggedIn(res: any): void {
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
