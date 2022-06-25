import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  isEdited = false;
  products: any;
  editedProductId: string;
  editedImgSrc:string;
  message: string = ''
  messageClass = 'd-none';
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ps: ProductService
  ) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      thumbnail: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getProducts();
  }
  productAction() {
    const data = this.productForm.value;
    if (this.isEdited) {
      this.ps.editProduct(this.editedProductId, data)
        .subscribe(
          (res) => {
            if (res.success) {
              this.message = res.message
              this.messageClass = 'alert alert-success'
              this.productForm.reset();
              setTimeout(() => {
                this.message = ''
                this.messageClass = 'd-none';
              }, 3000)
            } else {
              this.message = res.message
              this.messageClass = 'alert alert-danger'
              setTimeout(() => {
                this.message = '';
                this.messageClass = 'd-none';
              }, 3000)
            }

          },
          (err) => {
            alert("Server Error Try Again")
          }
        );
    } else {

      this.ps.addProduct(data)
        .subscribe(
          (res) => {
            if (res.success) {
              this.message = res.message
              this.messageClass = 'alert alert-success'
              this.productForm.reset();
              setTimeout(() => {
                this.message = ''
                this.messageClass = 'd-none';
              }, 3000)
            } else {
              this.message = res.message
              this.messageClass = 'alert alert-danger'
              setTimeout(() => {
                this.message = '';
                this.messageClass = 'd-none';
              }, 3000)
            }

          },
          (err) => {
            alert("Server Error Try Again")
          }
        );
    }
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
  edit(p: any) {
    this.isEdited = true;
    this.editedProductId = p._id
    this.editedImgSrc = p.thumbnail;
    this.productForm.get('title').setValue(p.title)
    this.productForm.get('description').setValue(p.description)
    this.productForm.get('price').setValue(p.price)
    this.productForm.get('thumbnail').setValue(p.thumbnail)
  }

  deleteProduct(id:string) {
    this.ps.deleteProduct(id)
        .subscribe((res) => {
          if(res.success) {
            this.getProducts();
          }
        })
  }
}
