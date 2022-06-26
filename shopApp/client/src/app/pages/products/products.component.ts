import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
declare var $: any;
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any;
  message: string = ''
  buyData = {};
  currentProduct:any;
  messageClass = 'd-none';
  orderForm: FormGroup;
  constructor(
    private ps: ProductService,
    private fb: FormBuilder,
    private us: UserService
  ) {
    this.orderForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    // $('#myModal').modal('show')
    if (localStorage.getItem('token') == null) {
      window.location.replace('/login')
    }
    this.getProducts()
  }

  getProducts() {
    this.ps.getAllProducts()
      .subscribe(
        (res) => {
          if (res.success) {
            this.products = res.data
          } else {
            this.products = null
          }
        },
        (err) => {
          alert("Server error")
        }
      )


  }
  buyNow(product) {
    this.currentProduct = product;
    this.buyData['product_id'] = product._id;
    this.buyData['amount'] = product.price;
    $('#myModal').modal('show')
  }
  createOrder() {
    this.buyData['name'] = this.orderForm.get('name').value;
    this.buyData['address'] = this.orderForm.get('address').value;
    this.us.addOrder(this.buyData)
      .subscribe((res) => {
        if (res.success) {
          this.message = res.message
          this.messageClass = 'alert alert-success'
          setTimeout(() => {
            this.message = ''
            this.messageClass = 'd-none';
            $('#myModal').modal('hide')
          }, 3000)
        } else {
          this.message = res.message
          this.messageClass = 'alert alert-danger'
          setTimeout(() => {
            this.message = '';
            this.messageClass = 'd-none';
          }, 3000)
        }
      })
  }

}
