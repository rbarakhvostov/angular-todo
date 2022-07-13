import { Component } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { TodosServise } from '../../services/todos.service';
import { FilterEnum } from '../../types/filter.enum';
import { TodoInterface } from '../../types/todo.interface';

@Component({
  selector: 'app-todos-main',
  templateUrl: './main.component.html',
})

export class MainComponent {
  visibleTodos$: Observable<TodoInterface[]>;
  noTodosClass$: Observable<boolean>;
  isAllTodosSelected$: Observable<boolean>;
  editingId: string | null = null;

  constructor(private todosServise: TodosServise) {
    this.noTodosClass$ = this.todosServise.todos$.pipe(map(todos => todos.length === 0));
    this.isAllTodosSelected$ = this.todosServise.todos$.pipe((map(todos => todos.every(todo => todo.isCompleted))));
    this.visibleTodos$ = combineLatest(
      [this.todosServise.todos$,
      this.todosServise.filter$]
    ).pipe(
      map(([todos, filter]: [TodoInterface[], FilterEnum]) => {
        if (filter === FilterEnum.active) {
          return todos.filter(todo => !todo.isCompleted);
        } else if (filter === FilterEnum.completed) {
          return todos.filter(todo => todo.isCompleted);
        } {
          return todos;
        }
      })
    )
  }

  toggleAllTodos(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.todosServise.toggleAll(target.checked);
  }

  setEditingId(editingId: string | null): void {
    this.editingId = editingId;
  }
}
