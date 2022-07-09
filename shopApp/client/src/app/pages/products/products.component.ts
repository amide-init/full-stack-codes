import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
declare var $: any;
declare var Razorpay:any;
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
  makePayment(product:any){
    var options = {
      "key": "rzp_test_S8jFMw693WUzaU", // Enter the Key ID generated from the Dashboard
      "amount": product.price*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": product.title,
      "description": product.description,
      "image": product.thumbnail,
      "handler": function (response){
        if(response.razorpay_payment_id) {
          alert("Payment added successfully")
        }else{
          alert("Payment not completed")
        }
      },
      
      "theme": {
          "color": "#ffc107"
      }
  };
    var rzp =  Razorpay(options);
    rzp.open();

  }

}
