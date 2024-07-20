import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { TodoListService } from './todo-list.service';

export interface Task {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  }

export interface TodoListState {
    toDoList: Task[];
    loading: boolean;
  }

@Injectable()
export class ToDoListDataStore extends ComponentStore<TodoListState> {

    constructor(private todoListService: TodoListService) {
        super({ toDoList: [], loading: false })
    }

    readonly setLoading = this.updater((state, loading: boolean) => ({
        ...state,
        loading: loading
    }))

    readonly updateToDoList = this.updater((state, todos: Task[]) => ({
        ...state,
        toDoList: todos,
        loading: false
    }))

    readonly selectLoading$ = this.select(state => state.loading);
    readonly selectToDoList$ = this.select(state => state.toDoList);

    readonly getToDoList = this.effect((trigger$: Observable<void>) => {
        return trigger$.pipe(
            tap(() => this.setLoading(true)),
            switchMap(() => 
                this.todoListService.getTodoList().pipe(
                    tap(todos => {
                        this.updateToDoList(todos);
                    })
                )
            )
        )
    })

}