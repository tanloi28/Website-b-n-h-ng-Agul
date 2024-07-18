import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {AthuseverService} from'../../app/services/athusever.service'
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgIf, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage: string | null = null;  // Biến lưu trữ thông báo lỗi

  constructor(private formBuilder: FormBuilder, private authService: AthuseverService, private router: Router) {}
  
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
}
onSubmit() {
  if (this.loginForm.invalid) {
    return;
  }

  const email = this.loginForm.value.email;
  const password = this.loginForm.value.password;

  this.authService.login(email, password).subscribe(
    () => {
      const successAlert = document.getElementById('successAlert');
      if (successAlert) {
        successAlert.style.display = 'block'; // Hiển thị cảnh báo thành công
        setTimeout(() => {
          this.router.navigate(['/admin/products/list']); 
        }, 3000); 
      }    },
    error => {
      console.error('Có lỗi xảy ra:', error);
      this.errorMessage = 'Có lỗi xảy ra khi thêm sản phẩm. Vui lòng thử lại sau.'; 
    }
  );
}
}