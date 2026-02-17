
import React from 'react';
import { NavItem, UserRole, Vendor, Product, Customer, Mechanic } from './types';

export const NAVIGATION_ITEMS: NavItem[] = [
  { 
    label: 'Master Setup', 
    id: 'master-setup', 
    icon: 'Settings', 
    roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN],
    children: [
      { label: 'Customer Setup', id: 'master-setup-customer', icon: 'User' },
      { label: 'Supplier Setup', id: 'master-setup-supplier', icon: 'Truck' },
      { label: 'Mechanic Setup', id: 'master-setup-mechanic', icon: 'Wrench' },
      { label: 'Parts Setup', id: 'master-setup-product', icon: 'Box' },
      { label: 'User Management', id: 'master-setup-user-mgmt', icon: 'Users' },
      { label: 'Branch Setup', id: 'master-setup-branch-setup', icon: 'Layers' },
      { label: 'Role Permissions', id: 'master-setup-role-perms', icon: 'Lock' },
      { label: 'Company Profile', id: 'master-setup-company-profile', icon: 'FileText' },
    ]
  },
  { 
    label: 'Accounts & Finance', 
    id: 'accounts', 
    icon: 'Wallet', 
    roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.ACCOUNTS_OFFICER],
    children: [
      { label: 'Chart of Accounts', id: 'accounts-coa', icon: 'Layers' },
      { label: 'Accounts Payable', id: 'accounts-payable', icon: 'DollarSign' },
      { label: 'Journal Voucher', id: 'accounts-journal', icon: 'FileText' },
      { label: 'Payment Voucher', id: 'accounts-payment', icon: 'ArrowRightLeft' },
      { label: 'Receipt Voucher', id: 'accounts-receipt', icon: 'CheckCircle2' },
      { label: 'Reverse Entry', id: 'accounts-reverse', icon: 'RefreshCw' },
      { label: 'Opening Balance', id: 'accounts-opening', icon: 'Calculator' },
      { label: 'Year End Process', id: 'accounts-yearend', icon: 'Clock' },
      { label: 'Post to Ledger', id: 'accounts-post-ledger', icon: 'Check' },
      { label: 'Reports', id: 'accounts-reports', icon: 'BarChart3' },
    ]
  },
  { 
    label: 'Procurement', 
    id: 'procurement', 
    icon: 'ShoppingCart', 
    roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.STORE_KEEPER],
    children: [
      { label: 'Requisition', id: 'procurement-requisition', icon: 'Plus' },
      { label: 'Purchase Order', id: 'procurement-purchase-order', icon: 'FileText' },
      { label: 'Reports', id: 'procurement-reports', icon: 'BarChart3' },
    ]
  },
  { 
    label: 'Sales & Recovery', 
    id: 'sales', 
    icon: 'TrendingUp', 
    roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.SALES_USER],
    children: [
      { label: 'Estimate Entry', id: 'sales-estimate', icon: 'FileSpreadsheet' },
      { label: 'Invoice Entry', id: 'sales-invoice', icon: 'FileText' },
      { label: 'Bill / Cash Memo', id: 'sales-cash-memo', icon: 'FileText' },
      { label: 'Revert Stock', id: 'sales-revert-stock', icon: 'RefreshCw' },
      { label: 'Dealer Sale', id: 'sales-dealer', icon: 'Users' },
      { label: 'Revert Parts', id: 'sales-revert-parts', icon: 'History' },
      { label: 'Registration', id: 'sales-registration', icon: 'FileText' },
      { label: 'Reports', id: 'sales-reports', icon: 'BarChart3' },
    ]
  },
  { 
    label: 'Inventory', 
    id: 'inventory', 
    icon: 'Box', 
    roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.STORE_KEEPER],
    children: [
      { label: 'GRN', id: 'inventory-grn', icon: 'Download' },
      { label: 'Stock Transaction', id: 'inventory-transaction', icon: 'History' },
      { label: 'Stock View', id: 'inventory-view', icon: 'Box' },
      { label: 'Stock Transfer Parts', id: 'inventory-transfer-parts', icon: 'ArrowRightLeft' },
      { label: 'Stock Receive Parts', id: 'inventory-receive-parts', icon: 'Download' },
      { label: 'Stock Transfer', id: 'inventory-transfer', icon: 'Upload' },
      { label: 'Stock Receive', id: 'inventory-receive', icon: 'Download' },
      { label: 'Stock Adjustment', id: 'inventory-adjustment', icon: 'RefreshCw' },
      { label: 'Delivery Order', id: 'inventory-do', icon: 'Truck' },
      { label: 'POST to GL (COGS)', id: 'inventory-post-gl', icon: 'Calculator' },
    ]
  },
  { 
    label: 'Store', 
    id: 'store', 
    icon: 'ShoppingCart', 
    roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.STORE_KEEPER],
    children: [
      { label: 'GRN', id: 'store-grn', icon: 'Download' },
      { label: 'Revert Stock', id: 'store-revert-stock', icon: 'RefreshCw' },
      { label: 'Stock Management', id: 'store-mgmt', icon: 'Box' },
      { label: 'Seize List', id: 'store-seize-list', icon: 'Shield' },
      { label: 'Delivery Order', id: 'store-do', icon: 'Truck' },
    ]
  },
  { 
    label: 'Service', 
    id: 'service', 
    icon: 'Wrench', 
    roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.SERVICE_USER, UserRole.ENGINEER],
    children: [
      { label: 'Customer Job Card', id: 'service-customer-jc', icon: 'User' },
      { label: 'Internal Job Card', id: 'service-internal-jc', icon: 'Settings' },
      { label: 'Warranty Job Card', id: 'service-warranty-jc', icon: 'Shield' },
      { label: 'Inspection Report', id: 'service-inspection', icon: 'FileText' },
      { label: 'Parts Issue', id: 'service-parts-issue', icon: 'Box' },
      { label: 'Service Billing', id: 'service-billing', icon: 'DollarSign' },
      { label: 'Service Reports', id: 'service-reports', icon: 'BarChart3' },
    ]
  }
];

export const COMPANY_DETAILS = {
  name: 'Al-Amin Enterprise',
  groupName: 'Gangchill Group',
  address: 'Plot-50, Dhaka-Mymensingh Highway, Gazipura, Tongi, Gazipur',
  phone: '01678819779',
  email: 'service@alamin-bd.com',
  gmail: 'service.gazipura@gmail.com'
};

export const SAMPLE_VENDORS: Vendor[] = [
  { id: 'v1', name: 'T-KING China Factory', address: 'Shandong, China', contact: '+86 123 4567 890' },
  { id: 'v2', name: 'Mobil 1 Bangladesh', address: 'Tejgaon I/A, Dhaka', contact: '01711 223344' },
  { id: 'v3', name: 'Rahimafrooz Battery', address: 'Mohakhali, Dhaka', contact: '01822 334455' },
];

export const INITIAL_CUSTOMERS: Customer[] = [
  { id: 'CUS-0947', name: 'Mohammad Rakibul Islam', address: 'Dhaka, Bangladesh', mobile: '01700-000000', email: 'rakibul@example.com' },
  { id: 'CUS-0948', name: 'TORAF ALI', address: 'Gazipur, Bangladesh', mobile: '01900-000000', email: 'toraf@example.com' },
];

export const INITIAL_MECHANICS: Mechanic[] = [
  { id: 'M-1', name: 'Mr. Mostofa', mobile: '01899112233', specialization: 'General Service', designation: 'Senior Mechanic' },
  { id: 'M-2', name: 'Abul Kashem', mobile: '01700112233', specialization: 'Engine Expert', designation: 'Foreman' }
];

export const INITIAL_PRODUCTS: Product[] = [
  { id: 'p1', sku: '1', name: 'Axel 1.0 Ton', category: 'Axel', stock: 100, price: 3500, unit: 'Pcs', taxRate: 0 },
  { id: 'p2', sku: '2', name: 'Axel 1.5 Ton', category: 'Axel', stock: 6, price: 4500, unit: 'Pcs', taxRate: 0 },
  { id: 'p3', sku: '3', name: 'Glass Mechine 1.0 Ton', category: 'Machine', stock: 40, price: 1500, unit: 'Pcs', taxRate: 0 },
  { id: 'p4', sku: '4', name: 'Glass Mechine 1.5 Ton', category: 'Machine', stock: 25, price: 2500, unit: 'Pcs', taxRate: 0 },
  { id: 'p5', sku: '5', name: 'Door Lock (out) 1.0 Ton', category: 'Body', stock: 40, price: 1000, unit: 'Pcs', taxRate: 0 },
  { id: 'p6', sku: '6', name: 'Door Lock (out) 1.5 Ton', category: 'Body', stock: 30, price: 1500, unit: 'Pcs', taxRate: 0 },
  { id: 'p7', sku: '7', name: 'Can Cover 1.0 Ton', category: 'Body', stock: 20, price: 1500, unit: 'Pcs', taxRate: 0 },
  { id: 'p8', sku: '8', name: 'Door Lock 1.0 Ton', category: 'Body', stock: 8, price: 3000, unit: 'Pcs', taxRate: 0 },
  { id: 'p9', sku: '9', name: 'Door Handel', category: 'Body', stock: 6, price: 2000, unit: 'Pcs', taxRate: 0 },
  { id: 'p10', sku: '10', name: 'Door Lock (In) 1.0 Ton', category: 'Body', stock: 8, price: 1600, unit: 'Pcs', taxRate: 0 },
  { id: 'p11', sku: '11', name: 'Windshield Rubber 1.0 Ton', category: 'Rubber', stock: 40, price: 1800, unit: 'Pcs', taxRate: 0 },
  { id: 'p12', sku: '12', name: 'Door Lock Chapa 1.0 Ton', category: 'Body', stock: 10, price: 1000, unit: 'Pcs', taxRate: 0 },
  { id: 'p13', sku: '13', name: 'Frog Light Switch 1.0 Ton', category: 'Electrical', stock: 15, price: 300, unit: 'Pcs', taxRate: 0 },
  { id: 'p14', sku: '14', name: 'Emergency Switch 1.0 Ton', category: 'Electrical', stock: 1, price: 500, unit: 'Pcs', taxRate: 0 },
  { id: 'p15', sku: '15', name: '5- Point Relay 1.5 Ton', category: 'Electrical', stock: 10, price: 300, unit: 'Pcs', taxRate: 0 },
  { id: 'p16', sku: '16', name: 'Relay Flasher', category: 'Electrical', stock: 8, price: 300, unit: 'Pcs', taxRate: 0 },
  { id: 'p17', sku: '17', name: 'Wiper water knob', category: 'Body', stock: 40, price: 300, unit: 'Pcs', taxRate: 0 },
  { id: 'p18', sku: '18', name: 'Brake Shoe Ass. 1.0 Ton', category: 'Brake', stock: 10, price: 700, unit: 'Set', taxRate: 0 },
  { id: 'p19', sku: '19', name: 'Oil Pump 0.75 Ton', category: 'Engine', stock: 8, price: 3500, unit: 'Pcs', taxRate: 0 },
  { id: 'p20', sku: '20', name: 'Door Bit Inside 1.0 Ton', category: 'Body', stock: 20, price: 500, unit: 'Pcs', taxRate: 0 },
  { id: 'p21', sku: '21', name: 'Door Bit Outside 1.0 Ton', category: 'Body', stock: 20, price: 800, unit: 'Pcs', taxRate: 0 },
  { id: 'p22', sku: '22', name: 'Release Bearing 1.0 Ton', category: 'Engine', stock: 15, price: 600, unit: 'Pcs', taxRate: 0 },
  { id: 'p23', sku: '23', name: 'Main Bearing STD 1.0 Ton', category: 'Engine', stock: 40, price: 1100, unit: 'Set', taxRate: 0 },
  { id: 'p24', sku: '24', name: 'Main Bearing 25 1.0 Ton', category: 'Engine', stock: 45, price: 1100, unit: 'Set', taxRate: 0 },
  { id: 'p25', sku: '25', name: 'Bigend Bearing 25 1.0 Ton', category: 'Engine', stock: 40, price: 1100, unit: 'Set', taxRate: 0 },
  { id: 'p26', sku: '26', name: 'Main Bearing 50 1.0 Ton', category: 'Engine', stock: 40, price: 1100, unit: 'Set', taxRate: 0 },
  { id: 'p27', sku: '27', name: 'Hubs Oil Seal R 1.0 Ton', category: 'Seal', stock: 350, price: 200, unit: 'Pcs', taxRate: 0 },
  { id: 'p28', sku: '28', name: 'Hubs Oil Seal F 1.5 Ton', category: 'Seal', stock: 350, price: 160, unit: 'Pcs', taxRate: 0 },
  { id: 'p29', sku: '29', name: 'Seal Gearbox 1.0 Ton', category: 'Seal', stock: 35, price: 100, unit: 'Pcs', taxRate: 0 },
  { id: 'p30', sku: '30', name: 'Seal Gearbox 1.5 Ton', category: 'Seal', stock: 50, price: 150, unit: 'Pcs', taxRate: 0 },
  { id: 'p31', sku: '31', name: 'Hubs Oil Seal R 1.5 Ton', category: 'Seal', stock: 40, price: 300, unit: 'Pcs', taxRate: 0 },
  { id: 'p32', sku: '32', name: 'Valve seat', category: 'Engine', stock: 40, price: 3000, unit: 'Set', taxRate: 0 },
  { id: 'p33', sku: '33', name: 'Wheel rim 1.0 Ton', category: 'Wheel', stock: 10, price: 5500, unit: 'Pcs', taxRate: 0 },
  { id: 'p34', sku: '34', name: 'Power Pipe 1.5 Ton', category: 'Engine', stock: 8, price: 2000, unit: 'Pcs', taxRate: 0 },
  { id: 'p35', sku: '35', name: 'Thrust Washer 1.0 Ton', category: 'Engine', stock: 50, price: 500, unit: 'Set', taxRate: 0 },
  { id: 'p36', sku: '36', name: 'Deshboard 1.0 Ton', category: 'Body', stock: 3, price: 15000, unit: 'Pcs', taxRate: 0 },
  { id: 'p37', sku: '37', name: 'Wheel Cylinder 1.0 Ton', category: 'Brake', stock: 88, price: 700, unit: 'Pcs', taxRate: 0 },
  { id: 'p38', sku: '38', name: 'Door Glass 1.0 Ton', category: 'Body', stock: 40, price: 1500, unit: 'Pcs', taxRate: 0 },
  { id: 'p39', sku: '39', name: 'Oil Pump 1.0 Ton', category: 'Engine', stock: 30, price: 3500, unit: 'Pcs', taxRate: 0 },
  { id: 'p40', sku: '40', name: 'Chamber Pakin 1.0 Ton', category: 'Engine', stock: 60, price: 400, unit: 'Pcs', taxRate: 0 },
  { id: 'p41', sku: '41', name: 'Brake Pad 1.0 Ton', category: 'Brake', stock: 200, price: 1100, unit: 'Set', taxRate: 0 },
  { id: 'p42', sku: '42', name: 'Engine Fan 7 Wings .075 Ton', category: 'Engine', stock: 15, price: 1000, unit: 'Pcs', taxRate: 0 },
  { id: 'p43', sku: '43', name: 'Radiator 1.0 Ton', category: 'Engine', stock: 20, price: 9000, unit: 'Pcs', taxRate: 0 },
  { id: 'p44', sku: '44', name: 'Oil Pipe 1.0 Ton', category: 'Engine', stock: 40, price: 500, unit: 'Pcs', taxRate: 0 },
  { id: 'p45', sku: '45', name: 'Release Bearing (With Housing) 1.0 Ton', category: 'Engine', stock: 120, price: 600, unit: 'Pcs', taxRate: 0 },
  { id: 'p46', sku: '46', name: 'Piston Ring 1.5 Ton', category: 'Engine', stock: 8, price: 3500, unit: 'Set', taxRate: 0 },
  { id: 'p47', sku: '47', name: 'Stearing Box 1.0 Ton', category: 'Engine', stock: 4, price: 18000, unit: 'Pcs', taxRate: 0 },
  { id: 'p48', sku: '48', name: 'Pully Water Pump 0.75 Ton', category: 'Engine', stock: 8, price: 1000, unit: 'Pcs', taxRate: 0 },
  { id: 'p49', sku: '49', name: 'Clutch Cable 0.75 Ton', category: 'Body', stock: 500, price: 600, unit: 'Pcs', taxRate: 0 },
  { id: 'p50', sku: '50', name: 'Accelerator cable 1/0.75 Ton', category: 'Body', stock: 400, price: 600, unit: 'Pcs', taxRate: 0 },
  { id: 'p51', sku: '51', name: 'Clutch Fork 1.0 Ton', category: 'Engine', stock: 12, price: 2500, unit: 'Pcs', taxRate: 0 },
  { id: 'p52', sku: '52', name: 'Valve Guide (ind) 1.0 Ton', category: 'Engine', stock: 50, price: 400, unit: 'Set', taxRate: 0 },
  { id: 'p53', sku: '53', name: 'CrankShaft 1.0 Ton', category: 'Engine', stock: 7, price: 11500, unit: 'Pcs', taxRate: 0 },
  { id: 'p54', sku: '54', name: 'Piston China 1.0 Ton', category: 'Engine', stock: 60, price: 5200, unit: 'Set', taxRate: 0 },
  { id: 'p55', sku: '55', name: 'Pressure Plate 1.0 Ton', category: 'Engine', stock: 10, price: 4500, unit: 'Pcs', taxRate: 0 },
  { id: 'p56', sku: '56', name: 'Combination Switch 1.5 Ton', category: 'Electrical', stock: 6, price: 3000, unit: 'Pcs', taxRate: 0 },
  { id: 'p57', sku: '57', name: 'Brake Servo 1.0 Ton', category: 'Brake', stock: 3, price: 4500, unit: 'Pcs', taxRate: 0 },
  { id: 'p58', sku: '58', name: 'Speedo Meter 1.0 Ton', category: 'Body', stock: 5, price: 4500, unit: 'Pcs', taxRate: 0 },
  { id: 'p59', sku: '59', name: 'Wiper Motor 1.5 Ton', category: 'Electrical', stock: 12, price: 3000, unit: 'Pcs', taxRate: 0 },
  { id: 'p60', sku: '60', name: 'Self 1.0 Ton', category: 'Electrical', stock: 5, price: 12000, unit: 'Pcs', taxRate: 0 },
  { id: 'p61', sku: '61', name: 'Self 1.5 Ton', category: 'Electrical', stock: 5, price: 12000, unit: 'Pcs', taxRate: 0 },
  { id: 'p62', sku: '62', name: 'Piston Ring China 1.0 Ton', category: 'Engine', stock: 20, price: 2000, unit: 'Set', taxRate: 0 },
  { id: 'p63', sku: '63', name: 'Valve 1.0 Ton', category: 'Engine', stock: 70, price: 2000, unit: 'Set', taxRate: 0 },
  { id: 'p64', sku: '64', name: 'Valve China 1.0 Ton', category: 'Engine', stock: 20, price: 2500, unit: 'Set', taxRate: 0 },
  { id: 'p65', sku: '65', name: 'Piston Ring (Ind) 1.0 Ton', category: 'Engine', stock: 120, price: 2000, unit: 'Set', taxRate: 0 },
  { id: 'p66', sku: '66', name: 'Brake Pad 0.75 Ton', category: 'Brake', stock: 15, price: 1000, unit: 'Set', taxRate: 0 },
  { id: 'p67', sku: '67', name: 'On-Off Motors H/H', category: 'Electrical', stock: 20, price: 2500, unit: 'Pcs', taxRate: 0 },
  { id: 'p68', sku: '68', name: 'Shock Absorber Pin Up', category: 'Engine', stock: 12, price: 300, unit: 'Pcs', taxRate: 0 },
  { id: 'p69', sku: '69', name: 'Clutch Cylinder Up 1.5 Ton', category: 'Engine', stock: 4, price: 3500, unit: 'Pcs', taxRate: 0 },
  { id: 'p70', sku: '70', name: 'Engine kit 4JB1', category: 'Engine', stock: 70, price: 3000, unit: 'Set', taxRate: 0 },
  { id: 'p71', sku: '71', name: 'Fuel Tank Steiner 1.0 Tin', category: 'Engine', stock: 5, price: 2500, unit: 'Pcs', taxRate: 0 },
  { id: 'p72', sku: '72', name: 'Wheel Stick LHR 1.5 Ton', category: 'Wheel', stock: 500, price: 300, unit: 'Pcs', taxRate: 0 },
  { id: 'p73', sku: '73', name: 'Wheel Stick RHR 1.5 Ton', category: 'Wheel', stock: 500, price: 300, unit: 'Pcs', taxRate: 0 },
  { id: 'p74', sku: '74', name: 'Kingpin Ass. 1.5 Ton', category: 'Engine', stock: 70, price: 2400, unit: 'Set', taxRate: 0 },
  { id: 'p75', sku: '75', name: 'On-Off Motors 1.0 Ton', category: 'Electrical', stock: 6, price: 2500, unit: 'Pcs', taxRate: 0 },
  { id: 'p76', sku: '76', name: 'Engine Mounteen 1.0 Ton', category: 'Engine', stock: 40, price: 400, unit: 'Pcs', taxRate: 0 },
  { id: 'p77', sku: '77', name: 'Cabin Mounteen 1.0 Ton', category: 'Engine', stock: 8, price: 1000, unit: 'Pcs', taxRate: 0 },
  { id: 'p78', sku: '78', name: 'Brake Oil Tank 1.5 Ton', category: 'Brake', stock: 15, price: 1200, unit: 'Pcs', taxRate: 0 },
  { id: 'p79', sku: '79', name: 'Fuel Filter Ass. Org. 1.0 Ton', category: 'Engine', stock: 20, price: 1500, unit: 'Pcs', taxRate: 0 },
  { id: 'p80', sku: '80', name: 'Oli Filter Org. 1.0 Ton', category: 'Engine', stock: 10, price: 400, unit: 'Pcs', taxRate: 0 },
  { id: 'p81', sku: '81', name: 'Kinpin 1.5 Ton', category: 'Engine', stock: 15, price: 2400, unit: 'Set', taxRate: 0 },
  { id: 'p82', sku: '82', name: 'Bigend Bearing STD 1.0 Ton', category: 'Engine', stock: 6, price: 1100, unit: 'Set', taxRate: 0 },
  { id: 'p83', sku: '83', name: 'Fuel Filter Ass 1.5 Ton', category: 'Engine', stock: 20, price: 2500, unit: 'Pcs', taxRate: 0 },
  { id: 'p84', sku: '84', name: 'Headgasket', category: 'Engine', stock: 170, price: 800, unit: 'Pcs', taxRate: 0 },
];
