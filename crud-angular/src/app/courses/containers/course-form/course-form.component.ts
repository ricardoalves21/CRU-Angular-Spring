import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Course } from '../../model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  //No Angular, sempre que temos um grupo de campos, ele se chama 'FormGroup'
  form = this.formBuilder.group({
    _id: [''],
    name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    category: ['', [Validators.required]],
  });

  //Essa injeção do 'FormBuilder' tem toda a lógica que nos ajuda a criar o nosso 'FormGroup'
  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    this.form.setValue({
      _id: course._id,
      name: course.name,
      category: course.category
    });
  }

  onSubmit() {
    this.service.save(this.form.value)
      .subscribe(result => this.onSuccess(),
      error => this.onError());

    this.location.back();
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Curso salvo com sucesso.', '', {duration: 4000});
  }

  private onError() {
    this.snackBar.open('Erro ao salvar curso.', '', {duration: 3000});
  }

    getErrorMessage(fieldName: string) {

      const field = this.form.get(fieldName);

      if(field?.hasError('required')) {
        return 'Preenchimento obrigatório!';
      }
      if(field?.hasError('minlength')) {
        // return 'Tamanho mínimo precisa ser de 5 caracteres';
        const requiredLenght = field.errors ? field.errors['minlength']['requiredLength'] : 5;
        return `Tamanho mínimo precisa ser de ${requiredLenght} caracteres`;
      }
      if(field?.hasError('maxlength')) {
        // return 'Tamanho máximo precisa ser de 100 caracteres';
        const requiredLenght = field.errors ? field.errors['maxlength']['requiredLength'] : 100;
        return `Tamanho máximo precisa ser de ${requiredLenght} caracteres`;
      }

      return 'Campo Inválido.';
    }
}
