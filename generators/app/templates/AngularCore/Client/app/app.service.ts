import { Injectable } from '@angular/core';
import { Person } from './shared/models/person.model';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class AppService{
    constructor(private http: Http) { }
    getPersons(): Observable<Person[]> {
        return this.http.get('api/Person')
                       .map(response => response.json() as Person[])
                       .catch(this.handleError);
    }

    getPerson(_id: number): Observable<Person> {
        return this.http.get('api/Person/' + _id)
                       .map(response => response.json() as Person[])
                       .catch(this.handleError);
    }

    addPerson(person: Person): Observable<Person> {
      return this.http.post('api/Person', person)
            .catch(this.handleError)
    }

    deletePerson(_id: number): Observable<Person> {
        return this.http.delete('api/Person/' + _id)
                       .catch(this.handleError);
    }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}


