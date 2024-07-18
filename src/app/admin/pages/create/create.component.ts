import { CategoryServiceService } from '../../../category-service.service';
import { NgIf, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Import FormBuilder và FormGroup từ thư viện @angular/forms
import { Router, RouterModule } from '@angular/router';  // Import Router

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ ReactiveFormsModule, NgIf, RouterModule, NgFor],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {
  productForm!: FormGroup;
  errorMessage: string | null = null;  // Biến lưu trữ thông báo lỗi
  categories: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private CategoryServiceService: CategoryServiceService) {}  // Inject Router

  ngOnInit(): void {
    this.productForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(6)]],
      description: ['', Validators.required],
      image: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.min(0)]],
      category:  ['', Validators.required],
      isShow: [false]
    });
    this.loadCategories(); 

  }
  loadCategories() {
    this.CategoryServiceService.getCategories().subscribe(
      (categories: any[]) => { // Specify the type of 'categories'
        this.categories = categories;
      },
      (error: any) => { // Specify the type of 'error'
        console.error('Error loading categories:', error);
      }
    );
  }

  get titleErrors() {
    return this.productForm.get('title')?.errors;
  }
  onSubmit() {
      // const categoryValue = this.productForm.get('category')?.value;

    if (this.productForm.valid) {
      this.http.post('http://localhost:3000/products', this.productForm.value).subscribe(
        response => {
          console.log('Sản phẩm đã được lưu:', response);
          const successAlert = document.getElementById('successAlert');
          if (successAlert) {
            successAlert.style.display = 'block'; // Hiển thị cảnh báo thành công
            setTimeout(() => {
              this.router.navigate(['/admin/products/list']); 
            }, 3000); 
          }
        },
        
        error => {
          console.error('Có lỗi xảy ra:', error);
          this.errorMessage = 'Có lỗi xảy ra khi thêm sản phẩm. Vui lòng thử lại sau.';  // Cập nhật thông báo lỗi
        }
      );
    } else {
      this.markAllFieldsAsTouched();

      console.log('Biểu mẫu không hợp lệ');
      // this.errorMessage = 'Biểu mẫu không hợp lệ. Vui lòng kiểm tra lại.';  // Cập nhật thông báo lỗi khi biểu mẫu không hợp lệ
    }
  }
  markAllFieldsAsTouched() {
    this.productForm.markAllAsTouched();
  }
  
}