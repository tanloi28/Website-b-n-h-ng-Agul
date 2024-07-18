import { Component } from '@angular/core';
import { AthuseverService } from '../../../services/athusever.service';
import { NgFor, NgIf } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.css'
})
export class UserlistComponent {
  users: any[] = [];

  constructor(private userService: AthuseverService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((users: any[]) => {
      this.users = users;
    });
  }
  deleteUser(userId: number) {
    const confirmed = confirm('Are you sure you want to delete this user?');
    if (confirmed) {
      this.userService.deleteUser(userId).subscribe(() => {
        this.users = this.users.filter(user => user.id !== userId);
   alert('xóa tk')
        });
      };
    }
  }


