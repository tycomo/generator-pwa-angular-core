import { Injectable } from '@angular/core';
import { Todo } from './shared/models/ToDo.model';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class AppService {
    constructor(private http: Http) { }

    addTodo(todo: Todo): Observable<Todo> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        const body = JSON.stringify(todo);
    console.log(body)
        return this.http.post('/api/ToDo/AddToDo', body, options)
            .map(response => response.json())
            .catch(this.handleError);
  }

  deleteTodo(id: number): Observable<Todo> {
    return this.http.delete('/api/ToDo/DeleteToDo/' + id)
        .catch(this.handleError);
  }

  getAllTodo(): Observable<Todo[]> {
      return this.http.get('/api/ToDo/GetToDo')
        .map(response => response.json() as Todo[])
        .catch(this.handleError);
  }

  getTodoById(id: number): Observable<Todo> {
    return this.http.get('/api/ToDo/GetToDo/' + id)
        .map(response => response.json() as Todo)
        .catch(this.handleError);
  }

  toggleTodoComplete(todo: Todo): Observable<Todo> {
    return this.http.patch('/api/ToDo/ToggleComplete', todo)
        .map(response => response.json() as Todo)
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
    return Observable.throw(errMsg);
  }
}


