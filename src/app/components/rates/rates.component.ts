import { Component, OnDestroy, OnInit } from '@angular/core';
import { RatesService } from './rates.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

export interface Rate {
  symbol: string;
  title: string;
  price?: string;
}

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.css'],
})

export class RatesComponent implements OnInit, OnDestroy {
  public requiredRates: Rate[] = [
    { symbol: 'ETHUSDT', title: 'ETH-USDT' }, { symbol: 'BTCUSDT', title: 'BTC-USDT' }
  ];

  private destroy$ = new Subject();

  constructor(private ratesService: RatesService) {
  }


  ngOnInit(): void {
    this.ratesService.getRates().pipe(takeUntil(this.destroy$)).subscribe(rates => {
      this.findRates(rates);
    });
  }

  private findRates(rates: Rate[]): void {
    this.requiredRates.forEach((value) => {
      const findRate = rates.find(el => el.symbol === value.symbol);
      if (findRate !== undefined) {
        value.price = this.setPrice(findRate);
      }
    });
  }

  private setPrice(value: Rate): string {
    return value.price.substr(0, 7);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
