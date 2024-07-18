// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [],
//   templateUrl: './register.component.html',
//   styleUrl: './register.component.css'
// })
// export class RegisterComponent {

// }
// register.component.ts
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {AthuseverService} from'../../app/services/athusever.service'
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgIf, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  errorMessage: string | null = null;  // Biến lưu trữ thông báo lỗi

  constructor(private formBuilder: FormBuilder, private authService: AthuseverService, private router: Router) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const username = this.registerForm.value.username;
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;

    this.authService.register(username, email, password).subscribe(
      () => {
        console.log('')
        const successAlert = document.getElementById('successAlert');
        if (successAlert) {
          successAlert.style.display = 'block'; // Hiển thị cảnh báo thành công
          
          setTimeout(() => {
            this.router.navigate(['/products/login']); 
          }, 3000); 
        }    },
      error => {
        // Xử lý lỗi đăng ký tại đây
        alert('loi')
      }
    );
  }
}