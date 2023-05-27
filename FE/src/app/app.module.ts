import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { NotificationService } from './services/notification.service';
import { CustomerModule } from './customers/customer.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [AppComponent],
  imports: [NgMultiSelectDropDownModule.forRoot(), BrowserModule, CustomerModule, HttpClientModule],
  providers: [ApiService, NotificationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
