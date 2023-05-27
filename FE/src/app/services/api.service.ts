import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotificationService } from './notification.service';
import { CustomerProductsDto } from '../models/shop.model';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  Get(strProduct:string, strCustomer: string) {
    return this.http.get(environment.SERVER_API_URL + '/Customer?strProduct=' + strProduct + '&strCustomer=' + strCustomer).pipe(
      map((data: any) => data as any),
      catchError(this.handleError)
    );
  }

  AddCustomerProducts(cusProductsDto: CustomerProductsDto) {
    return this.http
      .post(
        environment.SERVER_API_URL + '/Customer/AddDataPayment/',
        cusProductsDto
      )
      .pipe(
        map((data: any) => data),
        catchError(this.handleError)
      );
  }

  ClearData() {
    return this.http.get(environment.SERVER_API_URL + '/Customer/RefreshData').pipe(
      map((data: any) => data as any),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    let errMsg = error.message
      ? error.message
      : error.status
      ? `${error.status} - ${error.statusText}`
      : 'Server error';
    let errObj = { error: { code: -999, message: errMsg } };
    if (error.status != 401) {
      let _notification = new NotificationService();
      _notification.showMessage('error', errMsg);
    }
    return throwError(errObj);
  }
}
