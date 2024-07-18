import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AthuseverService {

  private usersUrl = 'http://localhost:3000/users';
  private loggedIn = false; // Trạng thái đăng nhập
  private currentUser: any = null; // Thông tin người dùng
  constructor(private http: HttpClient) { }

  register(username: string, email: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(this.usersUrl).pipe(
      switchMap(users => {
        const userExists = users.some(user => user.username === username || user.email === email);
        if (userExists) {
          return of(false); // Registration fails because username or email already exists
        }
        // Add the new user
        const newUser = { username, email, password };
        return this.http.post(this.usersUrl, newUser).pipe(
          map(() => true) // Registration successful
        );
      })
    );
  }
  
  login(usernameOrUser: string | any, password?: string): Observable<boolean> {
    let username: string;
    if (typeof usernameOrUser === 'string') {
      username = usernameOrUser;
    } else {
      username = usernameOrUser.username;
      password = usernameOrUser.password;
    }

    // Logic kiểm tra username và password
    if (username === 'admin@gmail.com' && password === 'admin123') {
      this.loggedIn = true;
      this.currentUser = { username };
      return of(true);
    }
    return of(false);
  }
  



  logout() {
    this.loggedIn = false;
    this.currentUser = null;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getCurrentUser(): any {
    return this.currentUser;
  }
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.usersUrl);
  }

  deleteUser(userId: number): Observable<any> {
    const url = `${this.usersUrl}/${userId}`;
    return this.http.delete(url);
  }
}



// login(email: string, password: string): Observable<any> {
//   return this.http.post(this.usersUrl,  { email, password }).pipe(
//     tap((response: any) => {
//       if (response && response.token) {
//         localStorage.setItem('token', response.token);
//       }
//     })
//   );
// }

// register(username: string, email: string, password: string): Observable<any> {
//   return this.http.post(this.usersUrl, { username, email, password }).pipe(
//     tap((response: any) => {
//       // Kiểm tra nếu response có chứa token
//       if (response && response.token) {
//         // Lưu token vào localStorage
//         localStorage.setItem('token', response.token);
//         console.log('Registration successful:', response);
//       } else {
//         console.error('Token not found in response:', response);
//       }
//     }),
//     catchError((error: any) => {
//       console.error('Registration failed:', error);
//       return throwError(error);
//     })
//   );
// }

// logout() {
//   localStorage.removeItem('token');
//   localStorage.removeItem('user');
// }

// isLoggedIn(): boolean {
//   return !!localStorage.getItem('token');
// }

// getToken(): string | null {
//   return localStorage.getItem('token');
// }

// getCurrentUser(): any {
//   const user = localStorage.getItem('user');
//   return user ? JSON.parse(user) : null;
// }
// deleteUser(userId: number): Observable<any> {
//   const url = `${this.usersUrl}/${userId}`;
//   return this.http.delete(url);
// }

// }