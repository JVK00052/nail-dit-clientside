import { Inject, Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ShopService } from '../../services/shop.service';
import { Product } from '../../models/product'
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Form } from '@angular/forms';

export interface DialogData { }

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})

export class ShopComponent implements OnInit {
  createProductForm: FormGroup;
  product: any = [];
  isAdminVar: any;
  tokenVar: any;

  constructor(public dialog: MatDialog, private shopservice: ShopService, private router: Router, private formBuilder: FormBuilder) { }

  openDialog() {
    this.dialog.open(AddDialog, {
      disableClose: true,
      panelClass: 'full-dialog'
    });
  }

  editDialog() {
    this.dialog.open(EditDialog, {
      disableClose: true,
      panelClass: 'full-dialog'
    });
  }

  ngOnInit() {

    this.getproduct();

    if (localStorage.getItem("isAdmin") == "true") {
      this.isAdminVar = true
    } else {
      this.isAdminVar = false
    }

    if (localStorage.getItem('token') == null) {
      this.tokenVar = false
    } else {
      this.tokenVar = true
    }

    this.createProductForm = this.formBuilder.group({
      "nameOfProduct": new FormControl(),
      "typeOfProduct": new FormControl(),
      "companyName": new FormControl(),
      "priceOfProduct": new FormControl(),
      "quantity": new FormControl(),
    })
  }

  getproduct() {
    this.product = [];
    this.shopservice.getProduct(this.product.id).subscribe((data: any) => {
      console.log(data)
      this.product = data
    })
  }

  deleteProduct(product: Product): void {
    if (localStorage.getItem('token')) {
      this.shopservice.deleteProduct(product).subscribe((product: any) => console.log(product))
      this.getproduct();
    } else {
      console.log('Not an authorized user.')
    }
  }

  editProduct(product: Product): void {
    if (localStorage.getItem('token')) {
      this.shopservice.editProduct(product).subscribe((product: Product) => console.log(product))
      this.getproduct();
    }
  }

  createProduct(nameOfProduct, typeOfProduct, companyName, priceOfProduct, quantity) {
    this.shopservice.createProduct(nameOfProduct, typeOfProduct, companyName, priceOfProduct, quantity).subscribe((product: Product) => console.log(product))
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    this.router.navigate(['/']);
    window.alert('You have been logged out.')
  }
}

@Component({
  selector: 'add-dialog',
  templateUrl: './add-dialog.html',
  styleUrls: ['./shop.component.css']
})

export class AddDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }
}

@Component({
  selector: 'edit-dialog',
  templateUrl: './edit-dialog.html',
  styleUrls: ['./shop.component.css']
})

export class EditDialog {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, dialog: MatDialog, private shopservice: ShopService, private router: Router) {

  }
  editProduct(product: Product): void {
    if (localStorage.getItem('token')) {
      this.shopservice.editProduct(product).subscribe((product: any) => console.log(product))
    }
  }
}