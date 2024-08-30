
import { BrandsComponent } from "../ecommerse/brands/brands.component";
import { HomeComponent } from "./home.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";

export const homeChildrenRoutes: any[] = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  {
    path: 'Home',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'Brands',
    component: BrandsComponent,
    pathMatch: 'full'
  },
  {
    path: 'ProductDetails/:id',
    component: ProductDetailsComponent,
    pathMatch: 'full'
  },
  // { path: '**', component: ErrorsComponent }
];
