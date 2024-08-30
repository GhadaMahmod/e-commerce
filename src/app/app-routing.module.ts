import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authChildrenRoutes } from './auth/auth-children-routes';
import { homeChildrenRoutes } from './home/home-children-routes';

const routes: Routes = [
  { path: '', redirectTo: '/Auth', pathMatch: 'full' },

  {
    path: 'Auth',
    loadComponent: () =>
      import('./auth/auth.component').then(
        (c) => c.AuthComponent
      ),
    children: authChildrenRoutes
  },
  {
    path: '',
    loadComponent: () =>
      import('./ecommerse/ecommerse.component').then(
        (c) => c.EcommerseComponent
      ),
    children: homeChildrenRoutes
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
