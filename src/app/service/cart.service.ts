import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import { CartModel } from '../model/ICartModel';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  private cartDataArray: CartModel = {
    count: 0,
    productData: []
}

  private cartData$ = new BehaviorSubject<CartModel>({count: 0, productData: []});
  private totalAmount = 0;
  private totalAmount$ = new BehaviorSubject<number>(0);


  constructor() { }


  addToCart(product) {
    console.log(product)
  }
}
