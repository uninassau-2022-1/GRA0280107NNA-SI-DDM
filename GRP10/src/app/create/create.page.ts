import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})

export class CreatePage implements OnInit {

  nameVal: string = "";
  emailVal: string = "";

  constructor(
   private crud: CrudService
  ) {
    this.crud.databaseConn(); 
  }

  ngOnInit() { }
   
  createUser(){
    this.crud.addItem(this.nameVal, this.emailVal);
  }
   
  remove(user) {
    this.crud.deleteUser(user);
  }
  
}