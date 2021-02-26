import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RatesService {

  constructor(private http: HttpClient) { }

  getRates(): Observable<any> {
    return this.http.get<any>('https://api.binance.com/api/v3/ticker/price');
  }
}
