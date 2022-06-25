import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products:any;
  constructor(private ps:ProductService) { }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this.ps.getAllProducts()
        .subscribe(
          (res) => {
            if(res.success) {
              this.products = res.data
            }else{
              this.products = null
            }
          },
          (err) => {
            alert("Server error")
          }
        )


  }

}
