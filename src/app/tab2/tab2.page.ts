import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  candidates = [
    {
      name: 'Batore',
      electoralParty: 'MDB',
      vice: 'Rolando Lero ',
      numberId: 231,
      countVotes: 0,
      percentage: 0,
    },
    {
      name: 'Ze Bonitinho',
      electoralParty: 'PT',
      vice: 'Seu Peru',
      numberId: 133,
      countVotes: 0,
      percentage: 0,
    },
    {
      name: 'Golias',
      electoralParty: 'PL',
      vice: 'Vera Verão',
      numberId: 222,
      countVotes: 0,
      percentage: 0,
    },
    {
      name: 'Professor Raimundo',
      electoralParty: 'Tabajara',
      vice: 'Seu Boneco',
      numberId: 777,
      countVotes: 0,
      percentage: 0,
    },
  ];
  candidatesView = this.candidates;
  candidate = null;
  totalVotes = 0;
  search = '';
  constructor() {}

  filterCandidate(value: string) {
    if (value === '' || value.length < 3) {
      this.candidatesView = this.candidates;
      this.candidate = null;
    } else {
      this.candidatesView = this.candidates.filter(
        (item) => item.numberId === Number(value)
      );
      this.candidate = this.candidatesView[0];
    }
  }
  toCorrect() {
    this.search = '';
  }

  submitElection() {
    this.countTotalVote();
    this.candidates[0].percentage = (this.candidates[0].countVotes * 100) / this.totalVotes;
    this.candidates[1].percentage = (this.candidates[1].countVotes * 100) / this.totalVotes;
    this.candidates[2].percentage = (this.candidates[2].countVotes * 100) / this.totalVotes;
    this.candidates[3].percentage = (this.candidates[3].countVotes * 100) / this.totalVotes;
  }
  countTotalVote() {
    this.totalVotes++;
    if (this.candidate.numberId === 123) {
      this.candidates[0].countVotes++;
    } else if (this.candidate.numberId === 272) {
      this.candidates[1].countVotes++;
    } else if (this.candidate.numberId === 789) {
      this.candidates[2].countVotes++;
    } else if (this.candidate.numberId === 767) {
      this.candidates[3].countVotes++;
    }
  }
}
