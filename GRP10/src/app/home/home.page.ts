import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  testead: String;

  testeLista: Array <any>;

  constructor(private testeInsert: CrudService) { this.testeInsert.databaseConn()}

  ngOnInit() {
  }

}
