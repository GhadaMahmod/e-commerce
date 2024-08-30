
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
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  private subscriptions: Subscription[] = [];
  showError: boolean = false;
  errMsg: string = '';

  registerForm = this.fb.group({
    name: ['', { validators: [Validators.required], updateOn: 'blur' }],
    email: ['', { validators: [Validators.required], updateOn: 'blur' }],
    phone: ['', { validators: [Validators.required], updateOn: 'blur' }],
    password: ['', { validators: Validators.required, updateOn: 'blur' }],
    remember: [false, []],
  });
  get formControls(): any {
    return this.registerForm?.controls;
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
    console.log(this.registerForm?.valid);

    if (this.registerForm?.valid) {
      let data = {
        name: this.registerForm?.value?.name,
        email: this.registerForm?.value?.email,
        password: this.registerForm?.value?.password,
        rePassword: this.registerForm?.value?.password,
        phone: this.registerForm?.value?.phone,
      };
      //Send Request to login
      let loginSubscription: Subscription = this.authService?.register(data)?.pipe(
        tap(res => this.handleSuccessLoggedIn(res)),
        catchError(err => this.handleError(err))
      ).subscribe();
      this.subscriptions.push(loginSubscription);
    } else {
    }
  }

  handleSuccessLoggedIn(res: any): void {
    if (res.statusMsg == 'fail') {
      this.errMsg = res.message;
      this.showError = true;
    } else {
      this.router.navigate(['/home']);
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
