import { Component, OnInit } from '@angular/core';
import { TodoListModel } from './todo-list-model';
import { TodoListService } from './todo-list.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
  imports: [CommonModule],
  standalone: true,
  host: {ngSkipHydration: 'true'}
})
export class TodoListComponent implements OnInit {
    todoListData: TodoListModel[] = [];
    userTodoList: { [key: number]: TodoListModel[] } = {};
  
    constructor(private todoListService: TodoListService) { }
  
    ngOnInit(): void {
      this.getTodoList();
    }

    getTodoList() {
        this.todoListService.getTodoList().subscribe(todoListData => {
            if(todoListData.length) {
                this.todoListData = todoListData;
                this.getTasksByUser();
            } else {
                
            }
        });
    }
  
    getTasksByUser(): void {
      this.todoListData.forEach(todoItem => {
        if (!this.userTodoList[todoItem.userId]) {
          this.userTodoList[todoItem.userId] = [];
        }
        this.userTodoList[todoItem.userId].push(todoItem);
      });
    }

    getTodoListUserIds(): number[] {
        return Object.keys(this.userTodoList).map(Number);
      }
}