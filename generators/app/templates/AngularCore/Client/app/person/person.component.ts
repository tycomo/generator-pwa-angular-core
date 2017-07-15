import { Component, OnInit } from '@angular/core';
import { Person } from '../shared//models/person.model';
import { AppService } from '../app.service';

@Component({
  selector: 'appc-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  errorMessage: string;
  person: Person[];
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.getPersons();
  }

  getPersons() {
    this.appService.getPersons().subscribe(
      person => this.person = person,
      error => this.errorMessage = <any>error);
  }

  getPerson(_id: number) {
    this.appService.getPerson(_id).subscribe(
      person => {
        this.person.length = 0;
        this.person.push(person);
      },
      error => this.errorMessage = <any>error);
  }

}


