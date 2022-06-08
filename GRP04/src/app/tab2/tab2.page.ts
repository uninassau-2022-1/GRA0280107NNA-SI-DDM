import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  candidates = [
    {
      name: 'Maria Eduarda',
      electoralParty: 'MDB',
      vice: 'Evelyn Oliveira',
      numberId: 123,
      countVotes: 0,
      percentage: 0,
    },
    {
      name: 'Julio Macedo',
      electoralParty: 'PT',
      vice: 'Evan Marques',
      numberId: 272,
      countVotes: 0,
      percentage: 0,
    },
    {
      name: 'Ana Ines',
      electoralParty: 'PTS',
      vice: 'Jeff trouxa',
      numberId: 789,
      countVotes: 0,
      percentage: 0,
    },
    {
      name: 'Kyu Hayato',
      electoralParty: 'KHT',
      vice: 'Kyu San',
      numberId: 767,
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
