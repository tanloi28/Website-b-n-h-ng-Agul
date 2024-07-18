import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from '../layout/content/content.component';
import { Component } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { ChitietComponent } from '../chitiet/chitiet.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [ContentComponent,HeaderComponent,RouterOutlet,FooterComponent,ChitietComponent, LoginComponent, RegisterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
