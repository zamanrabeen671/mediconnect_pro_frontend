export type RoleType = {
  id?: number;
  name?: string;
  permissions?: PermissionType[];
};

export type UserType = {
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  role?: RoleType;
};

export type UserPaginationType = {
  users?: UserType[];
  total?: number;
};


export type ProductType = {
  id?: number;
  category?: CategoryType;
  brand?: BrandType;
  name?: string;
  productCode?: string;
  imageURL?: string;
  description?: string;
  purchasePrice?: string;
  basePrice?: string;
  quantity?: string;
  discount?: string;
  taxAmount?: string;
  discontinued?: string;
  unit?: string;
  supplier?: string;
  supplierPhone?: string;
  createdAt?: string;
  updatedAt?: string;
  user?: UserType;
};

export type purchaseType = {
  id?: number;
  supplier?: string;
  supplierPhone?: string;
  invoiceNumber?: string;
  paidAmount?: number;
  price?: number;
  user?: any;
  orderStatus?: string;
  purchaseDate?: Date;
  paymentDate?: Date;
  paymentMethod?: string;
  purchaseProducts?: ProductType[];
}
export type saleType = {
  id?: number;
  customerName?: string;
  customerPhone?: string;
  invoiceNumber?: string;
  user?: any;
  price?: number;
  orderStatus?: string;
  saleDate?: Date;
  paymentDate?: Date;
  paymentMethod?: string;
  saleProducts?: ProductType[];
  receiveAmount?: number;
};
export type ProductPaginationType = {
  data?: ProductType[];
  total?: number;
};

export type CommonPaginationType = {
  data: BrandType[]
  total?: number;
}
export type CategoryType = {
  id?: number;
  name?: string;
};
export type BrandType = {
  id?: number;
  name?: string;
};

export type PurchaseType = {
  id?: number;
  invoiceNumber?: string;
  orderStatus?: string;
  purchaseDate?: string;
  supplier?: string;
  supplierPhone?: string;
};

export type PurchasePaginationType = {
  data?: PurchaseType[];
  total?: number;
};

export type AdminType = {
  data?: []
}
export type AdminSummer = {
  data?: {
    totalProducts: number;
    totalPurchases: number;
    totalSales: number;
    lowStockItems: number,
    duePurchaseItems: number,
    dueSaleItems: number,
  }
}
export type Reports = {
  data?: {
    totalRevenue: number;
    totalCOGS: number;
    grossProfit: number;
    totalExpenses: number;
    netProfit: number;
  }
}

export type PermissionType = {
  id?: number;
  name?: string;
};

export type ExpensesType = {
  id?: number;
  amount?: string;
  notes?: string;
  date?: string;
  category?: CategoryType;
  user?: UserType[];
};

export type ExpensesPaginationType = {
  data?: ExpensesType[];
  total?: number;
};

export type  PaymentType = {
  id?: number;
  amount?: number;
  method?: string;
  notes?: string;
  transactionId?: string;
  paymentFor?: 'sale' | 'purchase';
  saleId?: number;
  purchaseId?: number;
}

export type PaymentPaginationType = {
  data?: ExpensesType[];
  total?: number;
};