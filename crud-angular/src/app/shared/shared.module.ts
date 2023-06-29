import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { CategoryPipe } from './pipes/category.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ConfirmationDialogComponent } from '../courses/components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [ErrorDialogComponent, CategoryPipe, ConfirmationDialogComponent],
  imports: [CommonModule, AppMaterialModule],
  exports: [ErrorDialogComponent, ConfirmationDialogComponent, CategoryPipe, MatFormFieldModule]
})
export class SharedModule {}
