import { Component } from '@angular/core';
import { ChitietComponent } from '../../chitiet/chitiet.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ChitietComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  product: any; 
}
