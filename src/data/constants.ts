import { User, Project, Period, WaterParameter, ProjectConfiguration } from '../types';

export const DEMO_USERS: User[] = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    name: 'System Administrator',
    email: 'admin@cmc.gov.in',
    department: 'IT Administration',
    isActive: true
  },
  {
    id: '2',
    username: 'analyst',
    password: 'analyst123',
    role: 'analyst',
    name: 'Marine Data Analyst',
    email: 'analyst@cmc.gov.in',
    department: 'Marine Research',
    isActive: true
  },
  {
    id: '3',
    username: 'chemist',
    password: 'chemist123',
    role: 'analyst',
    name: 'Water Quality Chemist',
    email: 'chemist@cmc.gov.in',
    department: 'Chemical Analysis',
    isActive: true
  },
  {
    id: '4',
    username: 'biologist',
    password: 'biologist123',
    role: 'analyst',
    name: 'Marine Biologist',
    email: 'biologist@cmc.gov.in',
    department: 'Biological Research',
    isActive: true
  },
  {
    id: '5',
    username: 'technician',
    password: 'tech123',
    role: 'analyst',
    name: 'Lab Technician',
    email: 'technician@cmc.gov.in',
    department: 'Laboratory',
    isActive: true
  }
];

export const PROJECTS: Project[] = [
  { 
    id: '1', 
    name: 'National Water Monitoring Programme', 
    code: 'NWMP',
    description: 'Comprehensive water quality monitoring across coastal districts',
    status: 'active'
  },
  { 
    id: '2', 
    name: 'Integrated Coastal Zone Management Plan', 
    code: 'ICZMP',
    description: 'Integrated monitoring for sustainable coastal zone management',
    status: 'active'
  },
  { 
    id: '3', 
    name: 'Industrial Outfall Monitoring', 
    code: 'OUTFALL',
    description: 'Monitoring of industrial and municipal discharge outfalls',
    status: 'active'
  }
];

export const PERIODS: Period[] = [
  { id: '1', name: 'Pre-monsoon', months: 'March-May' },
  { id: '2', name: 'Monsoon', months: 'June-September' },
  { id: '3', name: 'Post-monsoon', months: 'October-February' }
];

export const YEARS = [2020, 2021, 2022, 2023, 2024, 2025];

export const WATER_PARAMETERS: WaterParameter[] = [
  // Physical Parameters
  { id: 'date', name: 'date', label: 'Date', unit: 'date', category: 'physical', required: true },
  { id: 'time', name: 'time', label: 'Time', unit: 'time', category: 'physical', required: true },
  { id: 'temperature', name: 'temperature', label: 'Temperature', unit: '°C', category: 'physical', min: 0, max: 50, required: true },
  { id: 'dissolved_oxygen', name: 'dissolved_oxygen', label: 'DO (mg/L) or % Saturation', unit: 'mg/L or %S', category: 'physical', min: 0, max: 20, required: true },
  { id: 'ph', name: 'ph', label: 'pH', unit: 'pH', category: 'physical', min: 0, max: 14, optimal: { min: 6.5, max: 8.5 }, required: true },
  { id: 'turbidity', name: 'turbidity', label: 'Turbidity', unit: 'NTU', category: 'physical', min: 0, max: 1000, required: true },
  { id: 'suspended_solids', name: 'suspended_solids', label: 'Suspended Solids', unit: 'mg/L', category: 'physical', min: 0, max: 500, required: true },
  
  // Chemical Parameters
  { id: 'bod', name: 'bod', label: 'BOD', unit: 'mg/L', category: 'chemical', min: 0, max: 100, required: true },
  { id: 'boron', name: 'boron', label: 'Boron', unit: 'mg/L', category: 'chemical', min: 0, max: 10, required: true },
  { id: 'oil_grease', name: 'oil_grease', label: 'O & G', unit: 'mg/L', category: 'chemical', min: 0, max: 100, required: true },
  
  // Biological Parameters
  { id: 'fecal_coliform', name: 'fecal_coliform', label: 'Fecal Coliform', unit: 'MPN', category: 'biological', min: 0, max: 10000, required: true },
  
  // Metal Parameters
  { id: 'arsenic', name: 'arsenic', label: 'As', unit: 'mg/L', category: 'metals', min: 0, max: 1, required: true },
  { id: 'cadmium', name: 'cadmium', label: 'Cd', unit: 'mg/L', category: 'metals', min: 0, max: 1, required: true },
  { id: 'copper', name: 'copper', label: 'Cu', unit: 'mg/L', category: 'metals', min: 0, max: 10, required: true },
  { id: 'lead', name: 'lead', label: 'Pb', unit: 'mg/L', category: 'metals', min: 0, max: 1, required: true },
  { id: 'chromium', name: 'chromium', label: 'Cr', unit: 'mg/L', category: 'metals', min: 0, max: 1, required: true },
  { id: 'nickel', name: 'nickel', label: 'Ni', unit: 'mg/L', category: 'metals', min: 0, max: 1, required: true },
  { id: 'zinc', name: 'zinc', label: 'Zn', unit: 'mg/L', category: 'metals', min: 0, max: 10, required: true },
  { id: 'mercury', name: 'mercury', label: 'Hg', unit: 'mg/L', category: 'metals', min: 0, max: 0.1, required: true },
  { id: 'iron', name: 'iron', label: 'Fe', unit: 'mg/L', category: 'metals', min: 0, max: 10, required: true },
  { id: 'manganese', name: 'manganese', label: 'Mn', unit: 'mg/L', category: 'metals', min: 0, max: 1, required: true }
];

export const WATER_QUALITY_PARAMETERS = [
  'pH', 'Temperature', 'Conductivity', 'Dissolved Oxygen', 'Turbidity', 
  'Salinity', 'Total Suspended Solids', 'Biochemical Oxygen Demand',
  'Chemical Oxygen Demand', 'Nitrates', 'Phosphates', 'Ammonia',
  'Chlorophyll-a', 'Faecal Coliform', 'Heavy Metals'
];

// Project-specific parameter configurations
export const PROJECT_CONFIGURATIONS: ProjectConfiguration[] = [
  {
    id: '1',
    projectId: 'iczmp',
    year: '2024',
    period: 'Pre-monsoon',
    parameters: [
      'pH', 'Temperature', 'Conductivity', 'Dissolved Oxygen', 'Turbidity',
      'Suspended Solids', 'BOD', 'Fecal Coliform', 'Arsenic', 'Cadmium', 'Lead'
    ],
    createdDate: '2024-01-15',
    updatedDate: '2024-01-15'
  },
  {
    id: '2',
    projectId: 'nwmp',
    year: '2024',
    period: 'Pre-monsoon',
    parameters: [
      'pH', 'Temperature', 'Conductivity', 'Dissolved Oxygen', 'Salinity',
      'BOD', 'Nitrates', 'Phosphates', 'Heavy Metals'
    ],
    createdDate: '2024-01-15',
    updatedDate: '2024-01-15'
  },
  {
    id: '3',
    projectId: 'outfall',
    year: '2024',
    period: 'Pre-monsoon',
    parameters: [
      'pH', 'Temperature', 'BOD', 'Oil & Grease', 'Suspended Solids',
      'Fecal Coliform', 'Heavy Metals', 'Turbidity'
    ],
    createdDate: '2024-01-15',
    updatedDate: '2024-01-15'
  }
];

// Available parameters by category for easy management
export const PARAMETER_CATEGORIES = {
  physical: ['pH', 'Temperature', 'Conductivity', 'Dissolved Oxygen', 'Turbidity', 'Suspended Solids', 'Salinity'],
  chemical: ['BOD', 'COD', 'Nitrates', 'Phosphates', 'Ammonia', 'Oil & Grease'],
  biological: ['Fecal Coliform', 'Chlorophyll-a'],
  metals: ['Arsenic', 'Cadmium', 'Copper', 'Lead', 'Chromium', 'Nickel', 'Zinc', 'Mercury', 'Iron', 'Manganese', 'Heavy Metals']
};

// Default parameter assignments for demo users
export const DEFAULT_PARAMETER_ASSIGNMENTS: Record<string, string[]> = {
  '2': ['pH', 'Temperature', 'Conductivity', 'Dissolved Oxygen'], // Marine Data Analyst
  '3': ['pH', 'Conductivity', 'BOD', 'Arsenic', 'Cadmium', 'Lead'], // Water Quality Chemist
  '4': ['Dissolved Oxygen', 'Turbidity', 'Fecal Coliform'], // Marine Biologist
  '5': ['Temperature', 'Suspended Solids', 'Turbidity', 'Iron', 'Manganese'], // Lab Technician
};
