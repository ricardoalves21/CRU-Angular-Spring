import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  //No Angular, sempre que temos um grupo de campos, ele se chama 'FormGroup'
  form: FormGroup;

  //Essa injeção do 'FormBuilder' tem toda a lógica que nos ajuda a criar o nosso 'FormGroup'
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: [null],
      category: [null],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    alert('Bora Salvar o formulário!!!');
  }

  onCancel() {
    alert('Cancela tudo fazenfavor!!!');
  }
}
