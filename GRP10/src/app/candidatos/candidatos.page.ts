import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';
import { CrudService } from '../services/crud.service';


@Component({
  selector: 'app-candidatos',
  templateUrl: './candidatos.page.html',
  styleUrls: ['./candidatos.page.scss'],
})
export class CandidatosPage implements OnInit {

  votos: CrudService[] = [];

  
  listaCandidatos: [{user_id: {}, name: {}, codigo: {}, qntvotos: {}, porcentagem: {}}];
  candidato: number;
  votoscandidato: [{}];
  quantidadeVot = 0;

  constructor(private crudService: CrudService) { 
    this.crudService.getCandidates().then(() =>{
      this.listaCandidatos = this.crudService.USERS;
    }).then(() => {
    })
   }

  ngOnInit() {
  }

votarCandidato() {
  if(this.candidato === 13) {
    let result = this.listaCandidatos.find(value => value.name === 'Lula');
    let resultadoinicial: any = result.qntvotos ;
    let resultadofinal: any = resultadoinicial + 1;
    this.crudService.inserirVotos(this.candidato, resultadofinal).then(()=> {
      this.crudService.getCandidates().then(() =>{
        this.listaCandidatos = this.crudService.USERS;
      })
    })
  } else  if(this.candidato === 17) {
    let result = this.listaCandidatos.find(value => value.name === 'Bolsonaro');
    let resultadoinicial: any = result.qntvotos ;
    let resultadofinal: any = resultadoinicial + 1;
    this.crudService.inserirVotos(this.candidato, resultadofinal).then(()=> {
      this.crudService.getCandidates().then(() =>{
        this.listaCandidatos = this.crudService.USERS;
      })
    })
  } else  if(this.candidato === 20) {
    let result = this.listaCandidatos.find(value => value.name === 'Moro');
    let resultadoinicial: any = result.qntvotos ;
    let resultadofinal: any = resultadoinicial + 1;
    this.crudService.inserirVotos(this.candidato, resultadofinal).then(()=> {
      this.crudService.getCandidates().then(() =>{
        this.listaCandidatos = this.crudService.USERS;
      })
    })
  }

  this.porcentagem();

} 

porcentagem() {
  let result = this.listaCandidatos.find(value => value.name === 'Lula');
  let resultadofinal: any = result.qntvotos;
  let resultBolsonaro = this.listaCandidatos.find(value => value.name ==='Bolsonaro');
  let resultadofinalBolsonaro : any = resultBolsonaro.qntvotos;
  let resultMoro = this.listaCandidatos.find(value => value.name ==='Moro');
  let votosMoro: any = resultMoro.qntvotos;
  let quantitadeTotalVotos = resultadofinal + resultadofinalBolsonaro + votosMoro
  this.quantidadeVot = quantitadeTotalVotos;

  let porcentagemmoro = ((votosMoro * quantitadeTotalVotos) / 100) * 100;
  let porcentagembolsonaro = ((resultadofinalBolsonaro * quantitadeTotalVotos) / 100) * 100 ;
  let porcentagemlula = ((resultadofinal * quantitadeTotalVotos) / 100) * 100;

  this.crudService.inserirPorcentagemMoro(20, porcentagemmoro);
  this.crudService.inserirPorcentagemLula(13, porcentagemlula);
  this.crudService.inserirPorcentagemBolsonaro(17, porcentagembolsonaro);

}

}
