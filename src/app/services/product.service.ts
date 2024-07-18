import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../shared/models/product.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
http = inject(HttpClient);
apiURl= 'http://localhost:3000/products';

  constructor() { }
  getAllProduct (){
    return this.http.get<Product[]>(this.apiURl).pipe(
      catchError(this.handleError)
    );

  }
  deleteProduct(id: number) {
    return this.http.delete(`${this.apiURl}/${id}`).pipe(
      catchError(this.handleError)
    );

  }
  // getProduct(id: number): Observable<Product> {
  //   const url = `${this.apiURl}/${id}`;
  //   return this.http.get<Product>(url).pipe(
  //     catchError(this.handleError)
  //   );

  // }
  getProduct(id: number) {
    return this.http.get<Product>(`${this.apiURl}/${id}`).pipe(
      catchError(this.handleError)
    );

  }
  
  updateProduct(id: string, productData: any) {
    return this.http.put<any>(`${this.apiURl}/${id}`, productData);
  }
  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      errorMessage = `Backend returned code ${error.status}, body was: ${error.error}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}