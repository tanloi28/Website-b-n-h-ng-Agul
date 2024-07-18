import { CategoryServiceService } from '../../../category-service.service'
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProductService } from'../../../services/product.service';
import { Category, Product } from '../../../shared/models/product.model';
import { FormsModule, NgModel } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, CommonModule, NgxPaginationModule, RouterModule,],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent {
  CategoryServiceService = inject(CategoryServiceService);
  errorMessage: string = '';
  filterValue: string = '';
  filteredProducts: Product[] = [];
  products: Product[] = [];
  productService = inject(ProductService);
  categories: Category[] = [];
  p: number = 1;


  ngOnInit() {
    this.productService.getAllProduct().subscribe(
      products => {
        this.products = products;
        this.filteredProducts = products;
      },
      error => {
        this.errorMessage = error;
      }
    );
    // this.CategoryServiceService.getCategories().subscribe(
    //   categories => {
    //     this.categories = categories;
    //   },
    //   error => {
    //     console.error('Error fetching categories:', error);
    //   }
    // );
    this.getCategories();

  }
  getCategories(): void {
    this.CategoryServiceService.getCategories()
      .subscribe(categories => this.categories = categories);
  }
  getCategoryName(categoryId: string): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  }
  filterProducts() {
    this.filteredProducts = this.products.filter(product => 
      product.title.toLowerCase().includes(this.filterValue.toLowerCase()) ||
      product.price.toString().includes(this.filterValue.toLowerCase())


    );
    this.p = 1;

  }

  viewProduct(product: Product) {
    console.log('View product:', product);
  }

  editProduct(product: Product) {
    console.log('Edit product:', product);
  }

  deleteProduct(productId: number) {
    const product = this.products.find(p => p.id === productId);
    if (product && confirm(`Bạn có chắc chắn muốn xóa sản phẩm: ${product.title}?`)) {
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          this.products = this.products.filter(p => p.id !== productId);
          this.filterProducts(); // Cập nhật danh sách sau khi xóa
          alert('Xóa sản phẩm thành công!');
        },
        error: (err: any) => {
          console.error('Lỗi khi xóa sản phẩm:', err);
          alert('Đã xảy ra lỗi khi xóa sản phẩm.');
        }
      });
    }
  }


}
