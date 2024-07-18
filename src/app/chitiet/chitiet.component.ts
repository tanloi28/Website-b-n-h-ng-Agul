import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/product.model';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ProductService } from '../services/product.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-chitiet',
  standalone: true,
  imports: [NgFor, RouterOutlet],
  templateUrl: './chitiet.component.html',
  styleUrl: './chitiet.component.css'
})
export class ChitietComponent implements OnInit {
  product!: Product;
    constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(id)
      .subscribe(data => this.product = data);
  }
}
