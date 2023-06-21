import { Injectable } from '@angular/core';
import { Building, OrderDetail, Product } from './order-details';

@Injectable({
  providedIn: 'root'
})
export class BatchService {

  constructor() { }

  public products!:Product[];
  public buildings!:Building[];
  public orders:OrderDetail[] = [];

  
}
