import { Routes } from '@angular/router';
import { SystemListComponent } from './system-list/system-list.component';
import { SystemDetailComponent } from './system-detail/system-detail.component';

export const PRODUCT_ROUTES: Routes = [
  { path: '', component: SystemListComponent },
  { path: ':id', component: SystemDetailComponent }
];