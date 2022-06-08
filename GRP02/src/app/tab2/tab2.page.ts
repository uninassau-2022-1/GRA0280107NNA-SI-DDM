import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {

  nameC: string = '';
  partyC: string = '';
  voteInput: string = '';
  voteList: Array<any>;
  candidateList: Array<any>;

  constructor(private crud: CrudService) { }

  ngOnInit() {
    this.crud.databaseConn();
  }

  ionViewDidEnter() {  
    this.voteList = this.crud.getAllVotes();
    this.candidateList = this.crud.getAllCandidate();
  }

  clear() {
    this.voteInput = '';
  }

  confirm() {
    this.crud.addVote(this.voteInput);
    this.voteList = this.crud.getAllVotes();
    this.clear
  }

  onChangeInput(){
    this.nameC = '';
    this.partyC = '';
    if (String(this.voteInput).length > 0){
      this.crud.getCandidateInfo(this.voteInput).then((res) => {
        this.nameC = res['nameCand'];
        this.partyC = res['partyCand'];
      })
    }
  }
}
