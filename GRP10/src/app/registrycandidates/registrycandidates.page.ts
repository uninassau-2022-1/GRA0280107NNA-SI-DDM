import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-registrycandidates',
  templateUrl: './registrycandidates.page.html',
  styleUrls: ['./registrycandidates.page.scss'],
})
export class RegistrycandidatesPage implements OnInit {

 

  constructor(private crudService: CrudService) { }

  ngOnInit() {
  }

 
}
