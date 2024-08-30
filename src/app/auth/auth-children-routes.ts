
import { ForgetPasswordComponent } from "./forget-password/forget-password.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

export const authChildrenRoutes: any[] = [
  { path: '', redirectTo: '/Auth/Login', pathMatch: 'full' },
  {
    path: 'Login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'ForgotPassword',
    component: ForgetPasswordComponent,
    pathMatch: 'full'
  },
  {
    path: 'Register',
    component: RegisterComponent,
    pathMatch: 'full'
  },

  // { path: '**', component: ErrorsComponent }
];
