import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/models/ToDo.model';
import { AppService } from '../app.service';

@Component({
  selector: '<%= selector %>-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class ToDoComponent implements OnInit {

  errorMessage: string;
  todos: Todo[];
  selectedTodo: Todo;
  newTodo: Todo = new Todo();


  constructor(private appService: AppService) { }

  ngOnInit() {
    this.getTodos();
  }

  addTodo() {
    this.appService.addTodo(this.newTodo)
    .subscribe( x => {
      this.getTodos();
      this.newTodo = new Todo();
    });
  }

  deleteTodo(id: number) {
    this.appService.deleteTodo(id).subscribe( x => {
      this.getTodos();
    });
  }

  getTodos() {
    this.appService.getAllTodo()
        .subscribe(todo => this.todos = todo, error => this.errorMessage = error);
  }

  getTodo(id: number) {
    this.appService.getTodoById(id)
        .subscribe(todo => this.selectedTodo = todo, error => this.errorMessage = error);
  }

  toggleTodoComplete(todo: Todo) {
    this.appService.toggleTodoComplete(todo)
      .subscribe( x => {
        this.getTodos();
    });
  }

}


