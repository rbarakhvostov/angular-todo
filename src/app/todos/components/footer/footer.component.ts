import { Component } from '@angular/core';
import {  map, Observable } from 'rxjs';
import { TodosServise } from '../../services/todos.service';
import { FilterEnum } from '../../types/filter.enum';

@Component({
  selector: 'app-todos-footer',
  templateUrl: './footer.component.html',
})

export class FooterComponent {
  noTodosClass$: Observable<boolean>;
  activeCount$: Observable<number>;
  itemsLeftText$: Observable<string>;
  filterEnum = FilterEnum;
  filter$: Observable<FilterEnum>;

  constructor(private todosServise: TodosServise) {
    this.activeCount$ = this.todosServise.todos$.pipe(map(todos => todos.filter(todo => !todo.isCompleted).length));
    this.itemsLeftText$ = this.activeCount$.pipe(map(activeCount => `item${activeCount !== 1 ? 's' : ''}`))
    this.noTodosClass$ = this.todosServise.todos$.pipe(map(todos => todos.length === 0));
    this.filter$ = this.todosServise.filter$;
  }

  changeFilter(event: Event, filterName: FilterEnum): void {
    event.preventDefault();
    this.todosServise.changeFilter(filterName);
  }
}
