import { CreateComponent } from './pages/create/create.component';
import { SidebarComponent } from './../admin/componlents/sidebar/sidebar.component';
import { Component } from '@angular/core';
import { ProductListComponent } from './../admin/pages/product-list/product-list.component';
import { RouterOutlet } from '@angular/router';
import { UserlistComponent } from './pages/userlist/userlist.component';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet,SidebarComponent, ProductListComponent, CreateComponent, UserlistComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
