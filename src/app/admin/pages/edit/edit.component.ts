import { CategoryServiceService } from './../../../category-service.service';
import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // Import ActivatedRoute và Router

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ ReactiveFormsModule, NgIf, RouterModule, NgFor],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  productForm!: FormGroup;
  errorMessage: string | null = null; // Biến lưu trữ thông báo lỗi
  productId: string | null = null; // Biến lưu trữ ID sản phẩm
  CategoryServiceService = inject(CategoryServiceService);
  categories: any[] = [];

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient, 
    private router: Router, 
    private route: ActivatedRoute // Inject ActivatedRoute
  ) {}

  ngOnInit(): void {
    
    this.productId = this.route.snapshot.paramMap.get('id'); // Lấy ID sản phẩm từ URL

    this.productForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(6)]],
      description: ['', Validators.required],
      image: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.min(0)]],
      category: ['', Validators.required],
      isShow: [false]
    });
    this.loadCategories(); 

    if (this.productId) {
      this.loadProduct(this.productId);
    }

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

  loadProduct(id: string) {
    this.http.get(`http://localhost:3000/products/${id}`).subscribe(
      (product: any) => {
        this.productForm.patchValue(product);
      },
      error => {
        console.error('Có lỗi xảy ra:', error);
        this.errorMessage = 'Không thể tải sản phẩm. Vui lòng thử lại sau.'; 
      }
    );
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.http.put(`http://localhost:3000/products/${this.productId}`, this.productForm.value).subscribe(
        response => {
          console.log('Sản phẩm đã được cập nhật:', response);
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
          this.errorMessage = 'Có lỗi xảy ra khi cập nhật sản phẩm. Vui lòng thử lại sau.'; // Cập nhật thông báo lỗi
        }
      );
    } else {
      this.markAllFieldsAsTouched();
      console.log('Biểu mẫu không hợp lệ');
    //   this.errorMessage = 'Biểu mẫu không hợp lệ. Vui lòng kiểm tra lại.'; // Cập nhật thông báo lỗi khi biểu mẫu không hợp lệ
    }
  }

  markAllFieldsAsTouched() {
    this.productForm.markAllAsTouched();
  }
}
