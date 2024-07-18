import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ProductListComponent } from './admin/pages/product-list/product-list.component';
import { LayoutComponent } from './layout/layout.component';
import { ChitietComponent } from './chitiet/chitiet.component';
import { ContentComponent } from './layout/content/content.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreateComponent } from './admin/pages/create/create.component';
import { EditComponent } from './admin/pages/edit/edit.component';
import { UserlistComponent } from './admin/pages/userlist/userlist.component';
import { AthuathuAdminService } from './athuathu-admin.service';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,  canActivate: [AthuathuAdminService] ,
    children: [
      {
        path: 'products/list',
        component: ProductListComponent,
      },
      {
        path: 'add',
        component: CreateComponent,
      },
      { path: 'edit/:id', component: EditComponent },
      { path: 'user', component: UserlistComponent }

    ],
  },
  {
    path: 'products',
    component: LayoutComponent ,
    children: [
      {
        path: 'login',
        component: LoginComponent ,
      },
      {
        path: 'register',
        component: RegisterComponent ,
      },
      {
        path: 'men', component: ContentComponent

      },
      {
        path: ':id', component: ChitietComponent
      },
   
    ],
  },
  // {
  //   path: 'login',
  //   component: LoginComponent ,
  // }
];