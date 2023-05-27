import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { NotificationService } from '../services/notification.service';
import { CustomerComponent } from './customer.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule ,
    FormsModule,
    NgMultiSelectDropDownModule
  ],
  declarations: [CustomerComponent],
  providers: [ApiService, NotificationService],
  exports: [CustomerComponent]
})
export class CustomerModule { }
