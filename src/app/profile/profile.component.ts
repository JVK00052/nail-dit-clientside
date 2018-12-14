import { Inject, OnInit, Component } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData { }

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  createDialog() {
    this.dialog.open(CCDialog, {
      disableClose: true,
      panelClass: 'full-dialog'
    });
  }

  openDialog() {
    this.dialog.open(AccountDialog, {
      disableClose: true,
      panelClass: 'full-dialog'
    });
  }
}

@Component({
  selector: 'profile-dialog',
  templateUrl: './profile-dialog.html',
  styleUrls: ['./profile.component.css']
})

export class CCDialog {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    
  }
}

export class AccountDialog {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    
  }
}