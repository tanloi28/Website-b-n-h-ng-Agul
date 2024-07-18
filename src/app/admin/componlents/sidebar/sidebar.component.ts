import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AthuseverService} from'../../../services/athusever.service'
import { NgIf } from '@angular/common';
import { AthuathuAdminService } from '../../../../app/athuathu-admin.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(public authService: AthuseverService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/products/login']);
  }
}

