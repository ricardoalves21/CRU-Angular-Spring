import { Observable, catchError, config, of } from 'rxjs';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../model/course';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})

export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]> | null = null;

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.refresh();
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  ngOnInit(): void {}

  onAdd() {
    //Este 'relativeTo' faz a adição da rota '/new' à rota que já está em uso 'this.route'
    this.refresh();
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(course: Course) {
    this.router.navigate(['edit', course._id], { relativeTo: this.route })
  }

  onRemove(course: Course) {
    this.coursesService.remove(course._id).subscribe(
      () => {
        this.snackBar.open('Curso excluído!', 'X', {duration: 5000, verticalPosition: 'top', horizontalPosition: 'center'});
        this.refresh();
      },
      () => this.onError('Erro ao tentar remover curso.')
    );
  }

  refresh() {
    this.courses$ = this.coursesService.list().pipe(
          catchError((error) => {
            this.onError('Erro ao carregar cursos');
            return of([]);
          })
        );
  }

}
