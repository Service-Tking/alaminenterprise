
export enum UserRole {
  SUPER_ADMIN = 'Super Admin',
  ADMIN = 'Admin',
  ACCOUNTS_OFFICER = 'Accounts Officer',
  STORE_KEEPER = 'Store Keeper',
  ENGINEER = 'Engineer',
  SALES_USER = 'Sales User',
  SERVICE_USER = 'Service User'
}

export enum JobCardStatus {
  RUNNING = 'Running',
  INSPECTION = 'Inspection',
  PARTS_ISSUE = 'Parts Issue',
  BILLING = 'Billing',
  COMPLETED = 'Completed',
  DELIVERED = 'Delivered'
}

export interface User {
  id: string;
  fullName: string;
  mobile: string;
  email: string;
  role: UserRole;
  branch: string;
  status: 'Active' | 'Inactive';
}

export interface Customer {
  id: string; // Customer Code
  name: string;
  address: string;
  mobile: string;
  email: string;
  registrationNo?: string;
  chassisNo?: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  address: string;
  openingBalance: number;
}

export interface Mechanic {
  id: string;
  name: string;
  mobile: string;
  specialization: string;
  designation: string;
}

export interface NavItem {
  label: string;
  id: string;
  icon: string;
  roles?: UserRole[];
  children?: NavItem[];
}

export interface Vendor {
  id: string;
  name: string;
  address: string;
  contact: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string; // Part Number/Code
  category: string;
  stock: number;
  price: number; // Sell Rate
  unit?: string; // PCS/Set
  taxRate?: number;
}

export interface POItem {
  sl: number;
  sku: string;
  description: string;
  quantity: number;
  unit: string;
  price: number;
}

export interface PurchaseOrder {
  id: string;
  vendorId: string;
  vendorName: string;
  date: string;
  deliveryDate: string;
  items: POItem[];
  total: number;
  status: 'Pending' | 'Received' | 'Cancelled';
}

export interface Estimate {
  id: string; // Estimate No
  date: string;
  customerName: string;
  registrationNo: string;
  chassisNo: string;
  phone: string;
  parts: IssuedPart[];
  totalAmount: number;
  status: 'Draft' | 'Sent' | 'Converted';
}

export interface FieldMapping {
  fieldName: string;
  top: number;
  left: number;
  fontSize: number;
}

export interface TemplateConfig {
  id: string;
  name: string;
  type: 'Invoice' | 'JobCard' | 'CashMemo';
  backgroundImage: string;
  fieldMappings: FieldMapping[];
}

export interface SeizeList {
  id: string;
  date: string;
  customerIdNo: string;
  customerName: string;
  address: string;
  mobile: string;
  officerName: string;
  registrationNo: string;
  chassisNo: string;
  capacity: string;
  nameOfDepo: string;
  papers: {
    acknowledgementSlip: boolean;
    registrationPapers: boolean;
    taxToken: boolean;
    routePermit: boolean;
    insuranceCertificate: boolean;
    fitness: boolean;
    caseSlip: boolean;
    smartCard: boolean;
  };
  inspectionReport: { [key: string]: string };
  remarks: string;
  condition: 'Running' | 'Off Road' | 'Accident' | '';
  assigner: { name: string; mobile: string };
  officers: { name: string; mobile: string };
  depoSignatory: { name: string; mobile: string };
}

export interface JobItem {
  sl: number;
  description: string;
  observation: string;
  labourBill: number;
}

export interface IssuedPart {
  id: string;
  partNo: string;
  partName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  taxRate?: number;
  unit?: string;
  returnedQuantity?: number;
}

export interface JobCard {
  id: string;
  date: string;
  customerName: string;
  address: string;
  phone: string;
  regNo: string;
  chassisNo: string;
  engineNo: string;
  model: string;
  dateIn: string;
  dateOut: string;
  kmsIn: string;
  kmsOut: string;
  mechanicName: string;
  warranty: string;
  serviceType: string;
  customerComplaints: string;
  jobs: JobItem[];
  partsIssued: IssuedPart[];
  totalLabour: number;
  remarks: string;
  status: JobCardStatus;
  discountRate?: number;
  discountAmount?: number;
  taxAmount?: number;
  grandTotal?: number;
  finalInvoiceId?: string;
  invoiceStatus?: 'Paid' | 'Pending' | 'Cancelled' | 'Confirmed';
  selectedTemplateId?: string;
  estimateNo?: string;
  deliveryDate?: string;
  payterms?: string;
  warehouse?: string;
}
