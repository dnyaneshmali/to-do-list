import { Component, OnInit } from '@angular/core';
import { TodoListModel } from './todo-list-model';
import { CommonModule } from '@angular/common';
import { ToDoListDataStore } from './todo-list-data.store';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
  imports: [CommonModule],
  standalone: true,
  host: { ngSkipHydration: 'true' },
  providers: [ToDoListDataStore]
})
export class TodoListComponent implements OnInit {
  todoListData: TodoListModel[] = [];
  userTodoList: { [key: number]: TodoListModel[] } = {};
  alertMessage: string = '';

  constructor(private toDoListDataStore: ToDoListDataStore) {}

  ngOnInit(): void {
    this.getTodoList();
  }

  getTodoList() {
    this.toDoListDataStore.getToDoList();
    this.toDoListDataStore.selectToDoList$.subscribe((todoListData) => {
      if (todoListData.length) {
        this.todoListData = todoListData;
        this.getTasksByUser();
      } else {
        this.alertMessage = 'To Do List is not available, please try again !!';
      }
    });
  }

  getTasksByUser(): void {
    this.todoListData.forEach((todoItem) => {
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
