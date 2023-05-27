import { RandomId } from "./random_id.model";

export class ShopModel {
  Id: string = RandomId.newRandomId();
  Name: string | undefined;
  Location: string | undefined;

  Checked: boolean = false;
}

export class ProductModel {
  Id: string = RandomId.newRandomId();
  Name: string | undefined;
  Price: number | undefined;
  ShopId: string = '';

  ShopName: string | undefined;
  Shops: ShopModel[] = [];
  Checked: boolean = false;
}

export class CustomerModel {
  Id: string = RandomId.newRandomId();
  Name: string | undefined;
  Dob: string | undefined;
  Email: string | undefined;

  ShopId: string | undefined;
  ProductId: string | undefined;

  ShopNames: string | undefined;
  Shops: ShopModel[] = [];

  ProductNames: string | undefined;
  Products: ProductModel[] = [];
  Checked: boolean = false;
}

export class CustomerProductModel {
  Id: string = RandomId.newRandomId();
  CustomerId: string = '';
  ProductId: string = '';
}

export class CustomerProductsDto {
  Shops: ShopModel[] = [];
  Products: ProductModel[] = [];
  Customers: CustomerModel[] = [];
  CustomerProducts: CustomerProductModel[] = [];
}

export class SortedResultModel {
  Name: string | undefined;
  Email: string | undefined;
  ShopName: string | undefined;
  ShopLocation: string | undefined;
  ProductName: string | undefined;
  Price: number | undefined;
}
  