import { ProductService } from './../../services/product.service';
import { Component, inject } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

// import { Message } from '../../shared/message';
@Component({
  selector: 'app-content',
  standalone: true,
  imports: [NgFor,RouterLink, MessagesModule, NgIf],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {
  products: Product[] = [];
  // messages: Message[] = [];
  errorMessage: string = '';

    productService = inject(ProductService);

  ngOnInit() {
    this.productService.getAllProduct().subscribe(
      products => {
        this.products = products;
      },
      // (error) => {
      //   this.messages.push({ severity: 'error', summary: 'Error', detail: error });
      // }
      error => {
        this.errorMessage = error;
      }
    );
  }
}