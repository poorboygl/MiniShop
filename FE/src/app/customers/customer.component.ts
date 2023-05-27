import {
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ApiService } from 'src/app/services/api.service';
import { CustomerModel, CustomerProductModel, ShopModel, CustomerProductsDto, SortedResultModel, ProductModel } from '../models/shop.model';
import { NotificationService } from '../services/notification.service';
const RAM_STRING = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

@Component({
  selector: 'customerApp',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  inputShop: ShopModel = new ShopModel();
  inputProduct: ProductModel = new ProductModel();
  inputCustomer: CustomerModel = new CustomerModel();

  shopList: ShopModel[] = [];
  productList: ProductModel[] = [];
  customerList: CustomerModel[] = [];
  customerProductList: ProductModel[] = [];
  sortedList: SortedResultModel[] = [];

  dropdownSettingTables: IDropdownSettings = {
    singleSelection: true,
    idField: "Id",
    textField: "Name",
    itemsShowLimit: 1
  }

  dropdownSettingCustomers: IDropdownSettings = {
    singleSelection: false,
    idField: "Id",
    textField: "Name",
    selectAllText: "Select All",
    unSelectAllText: "UnSelect All",
    enableCheckAll: true,
    itemsShowLimit: 1,
    allowSearchFilter: false
  }

  constructor(
    private service: ApiService,
    private notificationService: NotificationService
  ) {
  }
  ngOnInit(): void {
  }

  onAddShop() {
    if (!this.inputShop.Name || !this.inputShop.Location) {
      this.notificationService.showError('Shop Name and Location can not be empty!');
      return;
    }

    this.shopList.push(this.inputShop);
    this.shopList = this.shopList.map(x => x);
    this.inputShop = new ShopModel();
  }

  onDeleteShop() {
    this.shopList = this.shopList.filter(x => !x.Checked);
    this.inputShop = new ShopModel();
  }

  onCheckAllShop(e: any) {
    this.shopList.forEach(x => x.Checked = e.target.checked);
  }

  onAddProduct() {
    if (!this.inputProduct.Name || !this.inputProduct.Price || this.inputProduct.Shops.length == 0) {
      this.notificationService.showError('Product Name, Price and Shop can not be empty!');
      return;
    }

    this.inputProduct.ShopId = this.inputProduct.Shops[0] ? this.inputProduct.Shops[0].Id : "";
    this.inputProduct.ShopName = this.inputProduct.Shops[0] ? this.inputProduct.Shops[0].Name : "";

    this.productList.push(this.inputProduct);
    this.productList = this.productList.map(x => x);
    this.inputProduct = new ProductModel();
  }

  onDeleteProduct() {
    this.productList = this.productList.filter(x => !x.Checked);
    this.inputProduct = new ProductModel();
  }

  onCheckAllProduct(e: any) {
    this.productList.forEach(x => x.Checked = e.target.checked);
  }

  onAddCustomer() {
    if (!this.inputCustomer.Name || !this.inputCustomer.Email || this.inputCustomer.Shops.length == 0 ||
      this.inputCustomer.Products.length == 0) {
      this.notificationService.showError('Customer Name, Email, Shop and Product can not be empty!');
      return;
    }

    this.inputCustomer.ShopNames = this.inputCustomer.Shops && this.inputCustomer.Shops.length ?
      this.inputCustomer.Shops.map(x => x?.Name).join(", ") : "";

    this.inputCustomer.ProductNames = this.inputCustomer.Products && this.inputCustomer.Products.length ? this.inputCustomer.Products.map(x => x?.Name).join(", ") : "";

    this.customerList.push(this.inputCustomer);
    this.customerList = this.customerList.map(x => x);
    this.inputCustomer = new CustomerModel();

    this.customerProductList = [];
  }

  onDeleteCustomer() {
    this.customerList = this.customerList.filter(x => !x.Checked);
    this.inputCustomer = new CustomerModel();
  }

  onCheckAllCustomer(e: any) {
    this.customerList.forEach(x => x.Checked = e.target.checked);
  }

  onCustomerShopSelect(e: any) {
    this.customerProductList = [];
    if (!e || !e.Id) {
      return;
    }
    this.customerProductList = this.productList.filter(x => x.ShopId == e.Id);
    this.inputCustomer.Products = [];
  }

  onCustomerShopSelectAll(e: any) {
    this.customerProductList = [];
    if (!e) {
      return;
    }
    const resIds = (e as any[]).map(x => x.Id);
    if (!resIds || !resIds.length) {
      return;
    }
    this.customerProductList = this.productList.filter(x => resIds.indexOf(x.ShopId) !== - 1);
    this.inputCustomer.Products = [];
  }

  onSave() {
    this.service.AddCustomerProducts(this.handleData()).subscribe(
      (res: any) => {
        if (res.Success) {
          this.notificationService.showSuccess(res.Message);
          this.onLoad();
        } else {
          this.notificationService.showError(res.Message);
        }
      }
    );
  }

  onLoad() {
    this.service.Get().subscribe(
      (res: any) => {
        if (res.Success) {
          this.sortedList = res.Data;
        } else {
          this.notificationService.showError(res.Message);
        }
      }
    );
  }

  onClear() {
    this.service.ClearData().subscribe(
      (res: any) => {
        if (res.Success) {
          this.notificationService.showSuccess(res.Message);
          this.sortedList = res.Data;
        } else {
          this.notificationService.showError(res.Message);
        }
      }
    );
  }

  private handleData(): CustomerProductsDto {
    let result = new CustomerProductsDto();
    result.Shops = this.shopList;
    result.Products = this.productList;
    result.Customers = this.customerList;
    result.CustomerProducts = [];

    this.customerList.forEach(cust => {
      cust.Products.forEach(product => {
        let newCustProduct = new CustomerProductModel();
        newCustProduct.CustomerId = cust.Id;
        newCustProduct.ProductId = product.Id;
        result.CustomerProducts.push(newCustProduct);
      });
    });

    return result;
  }


  // 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
  onAddShopRandom() {
    this.inputShop.Name = this.randomString(3, RAM_STRING);
    this.inputShop.Location = this.randomString(7, RAM_STRING);
    this.onAddShop();
  }

  onAddProductRandom() {
    this.inputProduct.Name = this.randomString(4, RAM_STRING);
    if (this.shopList.length > 0) this.inputProduct.Shops = [this.shopList[this.getRandomInt(this.shopList.length - 1)]];
    this.inputProduct.Price = Math.floor(Math.random() * 1000);
    this.onAddProduct();
  }

  onAddCustomerRandom() {
    this.inputCustomer.Name = this.randomString(3, RAM_STRING);
    this.inputCustomer.Email = this.randomString(5, RAM_STRING) + '@hotmail.com'; 
    this.inputCustomer.Dob = new Date().toISOString().split('T')[0];
    if (this.shopList.length > 0) this.inputCustomer.Shops = [this.shopList[this.getRandomInt(this.shopList.length - 1)]];
    const resIds = this.inputCustomer.Shops.map(x => x?.Id);
    this.customerProductList = this.productList.filter(x => resIds.indexOf(x.ShopId) !== - 1);
    if (this.customerProductList.length > 0) this.inputCustomer.Products = [this.customerProductList[this.getRandomInt(this.customerProductList.length - 1)]];
    this.onAddCustomer();
  }

  private getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  private randomString(length: number, chars: string) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  checkValue(event: any) {
    if (event.target.value < 0) {
      event.target.value = 0;
    }
  }
}
