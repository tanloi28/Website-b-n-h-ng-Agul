import { CreateComponent } from './admin/pages/create/create.component';
import { FormsModule, NgModel } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../app/admin/componlents/sidebar/sidebar.component';
import { ProductListComponent } from '../app/admin/pages/product-list/product-list.component';
import {AdminComponent} from '../app/admin/admin.component'
import { LayoutComponent } from './layout/layout.component';
import { ChitietComponent } from './chitiet/chitiet.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ContentComponent } from './layout/content/content.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserlistComponent } from './admin/pages/userlist/userlist.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent,ProductListComponent, AdminComponent, LayoutComponent, ChitietComponent, HeaderComponent, FooterComponent,ContentComponent, LoginComponent, RegisterComponent,CreateComponent, UserlistComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // title: string = 'Tiêu đề của ứng dụng';
  
}
