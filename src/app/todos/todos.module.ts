import { NgModule } from "@angular/core";
import { TodosComponent } from "src/app/todos/components/todos.components";
import { HeaderComponent } from "src/app/todos/components/header/header.component";
import { TodosServise } from "src/app/todos/services/todos.service";
import { MainComponent } from "src/app/todos/components/main/main.components";
import { FooterComponent } from "src/app/todos/components/footer/footer.component";
import { CommonModule } from "@angular/common";
import { TodoComponent } from "src/app/todos/components/todo/todo.component";

@NgModule({
  declarations: [TodosComponent, HeaderComponent, MainComponent, FooterComponent, TodoComponent],
  imports: [CommonModule],
  exports: [TodosComponent],
  providers: [TodosServise]
})
export class TodosModule { }
