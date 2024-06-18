import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TodoListModel } from './todo-list-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

    private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

    constructor(private http: HttpClient) { }
  
    getTodoList(): Observable<TodoListModel[]> {
      return this.http.get<TodoListModel[]>(this.apiUrl);
    }
}