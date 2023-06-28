import { Course } from './../../model/course';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {

  @Input() courses: Course[] = []; //Input é tudo que está entrando nesta variável.
  @Output() add = new EventEmitter(false); //Output é tudo que está saindo desta variável.
  @Output() edit = new EventEmitter(false); //Output é tudo que está saindo desta variável.
  @Output() remove = new EventEmitter(false);

  readonly displayedColumns = ['name', 'category', 'actions'];

  constructor() {}

  ngOnInit(): void {}

  onAdd() {
    this.add.emit(true);
  }

  onEdit(course: Course) {
    this.edit.emit(course); //Estou enviando a variável com todos os seus atributos.
  }

  onRemove(course: Course) {
    this.remove.emit(course);
  }

}
