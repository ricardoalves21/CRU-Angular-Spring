import { Observable, catchError, of } from 'rxjs';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../model/course';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
//
export class CoursesComponent implements OnInit {
  //
  courses$: Observable<Course[]>;

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.courses$ = this.coursesService.list().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar cursos');
        return of([]);
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  ngOnInit(): void {}

  onAdd() {
    //Este 'relativeTo' faz a adição da rota '/new' à rota que já está em uso 'this.route'
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
