import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotaFiscal, Nota } from './nota';
import { Product } from './produto';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  readonly url: string = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/products`)
  }

  saveNota(n: Nota): Observable<Nota> {
    return this.http.post<Nota>(`${this.url}/notas`, n);
  }

  getNotas(): Observable<Nota[]>{
    return this.http.get<Nota[]>(`${this.url}/notas`)
  }
}
