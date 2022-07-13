import { Component } from '@angular/core';
import { TodosServise } from '../../services/todos.service';

@Component({
  selector: 'app-todos-header',
  templateUrl: './header.component.html',
})

export class HeaderComponent {
  text = ''

  constructor(private todoService: TodosServise) {

  }

  changeText(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.text = target.value;
  }

  addTodo(): void {
    this.todoService.addTodo(this.text);
    this.text = '';
  }
}