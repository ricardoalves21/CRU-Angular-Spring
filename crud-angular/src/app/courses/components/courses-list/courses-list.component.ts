import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../model/course';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {

  @Input() courses: Course[] = []; //Input é tudo que está entrando nesta variável.
  @Output() add = new EventEmitter(false); //Output é tudo que está saindo desta variável.

  readonly displayedColumns = ['name', 'category', 'actions'];

  constructor() {}

  ngOnInit(): void {}

  onAdd() {
    this.add.emit(true);
  }

}
