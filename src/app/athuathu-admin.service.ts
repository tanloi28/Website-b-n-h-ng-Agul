// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AthuathuAdminService {

//   constructor() { }
// }
// admin.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AthuseverService} from'../app/services/athusever.service'

@Injectable({
  providedIn: 'root'
})
export class AthuathuAdminService implements CanActivate {
  constructor(private authService: AthuseverService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/products/login']);
      return false;
    }
  }
}