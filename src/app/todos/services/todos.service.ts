import { Injectable } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";
import { FilterEnum } from "../types/filter.enum";
import { TodoInterface } from "../types/todo.interface";

@Injectable()

export class TodosServise {
  todos$ = new BehaviorSubject<TodoInterface[]>([]);
  filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);
  
  addTodo(text: string): void {
    const newTodo: TodoInterface = {
      text,
      isCompleted: false,
      id: String(Math.random())
    }

    const updatedTodos = [...this.todos$.getValue(), newTodo];
    this.todos$.next(updatedTodos);
  }

  toggleAll(isCompleted: boolean): void {
    const updatedTodos = this.todos$.getValue().map(todo => ({
      ...todo,
      isCompleted
    }));

    this.todos$.next(updatedTodos);
  }

  changeFilter(filterName: FilterEnum): void {
    this.filter$.next(filterName);
  }

  changeTodo(id: string, text: string): void {
    const updatedTodos = this.todos$.getValue().map(todo => {
      if (todo.id === id) {
        return {...todo, text }
      }
      
      return todo;
    });

    this.todos$.next(updatedTodos);
  }

  removeTodo(id: string): void {
    const updatedTodos = this.todos$.getValue().filter(todo => todo.id !== id);

    this.todos$.next(updatedTodos);
  }

  toggleTodo(id: string): void {
    const updatedTodos = this.todos$.getValue().map(todo => {
      if (todo.id === id) {
        return {...todo, isCompleted: !todo.isCompleted }
      }

      return todo;
    });

    this.todos$.next(updatedTodos);
  }
}
