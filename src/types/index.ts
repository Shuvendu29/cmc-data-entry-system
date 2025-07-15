// Type definitions for the CMC Data Entry System

export interface User {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'analyst';
  name: string;
  email: string;
  department: string;
  isActive: boolean;
}

export interface Project {
  id: string;
  name: string;
  code: string;
  description: string;
  status: 'active' | 'inactive';
}

export interface Period {
  id: string;
  name: string;
  months: string;
}

export interface Station {
  id: string;
  code: string;
  name: string;
  location: string;
  justification?: string;
  iczmprRef?: string;
  cpcbRef?: string;
  cpcbCode?: string;
  isActive: boolean;
  
  // Geographic coordinates (supports both DMS and decimal degrees)
  latitude?: string; // DMS format for ICZMP, decimal degrees for Outfall
  longitude?: string; // DMS format for ICZMP, decimal degrees for Outfall
  latitudeDec?: number; // Decimal degrees for precise mapping
  longitudeDec?: number; // Decimal degrees for precise mapping
  
  // ICZMP specific fields
  stationType?: string; // R/E/S/OS (River/Estuary/Shore/Offshore)
  influence?: string; // FJ/R/I/P/T (Fishing Jetty/River/Industrial/Port/Turtle)
  distanceFromShore?: string; // in Km
  tide?: string; // LT/HT (Low Tide/High Tide)
  samplingDepth?: string; // S/C/B (Surface/Center/Bottom)
  depth?: string; // Depth in meters
  sachiDepth?: string; // Sachi Depth in meters
  stretch?: string; // Stretch identifier
}

export interface District {
  id: string;
  name: string;
  code: string;
  stations: Station[];
}

export interface WaterQualityData {
  // Basic sampling info
  date?: string;
  time?: string;
  cpcbStationCode?: string;
  stretch?: string;
  
  // Physical Parameters
  temperature?: number; // °C
  pH?: number;
  conductivity?: number; // mS/cm
  tds?: number; // g/L
  tss?: number; // mg/L
  turbidity?: number; // NTU
  salinity?: number; // PSU
  
  // Chemical Parameters
  alkalinity?: number; // mg/L
  dissolvedOxygen?: number; // mg/L
  bod?: number; // mg/L
  
  // Nutrients (µmol/L)
  nitriteN?: number; // µmol/L
  ammoniaN?: number; // µmol/L
  nitrateN?: number; // µmol/L
  orthoPhosphate?: number; // µmol/L
  silicate?: number; // µmol/L
  
  // Biological Parameters
  totalColiform?: number; // MPN/100ml
  fecalColiform?: number; // MPN/100ml
  chlorophyllA?: number; // mg/m³
  phaeophytinPigment?: number; // mg/m³
  phytoAbundance?: number; // no/ml
  zooBiomass?: number; // ml/10m³
  zooAbundance?: number; // no/10m³
  
  // Heavy Metals (µg/L)
  mercury?: number; // µg/L
  vanadium?: number; // µg/L
  chromium?: number; // µg/L
  manganese?: number; // µg/L
  iron?: number; // µg/L
  cobalt?: number; // µg/L
  nickel?: number; // µg/L
  copper?: number; // µg/L
  zinc?: number; // µg/L
  arsenic?: number; // µg/L
  lead?: number; // µg/L
  molybdenum?: number; // µg/L
  cadmium?: number; // µg/L
  
  // Carbon Parameters
  toc?: number; // mg/L
  tic?: number; // mg/L
  
  // Other Parameters
  fluoride?: number; // mg/L
  
  // Legacy NWMP parameters (for backward compatibility)
  floatingMatters?: string;
  colour?: number; // colour unit
  odour?: string;
  suspendedSolids?: number; // mg/L (for NWMP compatibility)
  oilAndGrease?: number; // mg/L (O & G)
}

export interface AnalysisRecord {
  id: string;
  year: number;
  period: string;
  project: string;
  location: string;
  analyst: string;
  dateCreated: string;
  status: 'completed' | 'in-progress' | 'pending';
}

export interface WaterQualityParameter {
  min: number | string;
  max: number | string;
  unit: string;
  optimal: { min: number | string; max: number | string };
  label: string;
}

export type WaterQualityParameters = Record<string, WaterQualityParameter>;

export interface ParameterAssignment {
  id: string;
  userId: string;
  projectId: string;
  districtId?: string;
  stationId?: string;
  parameters: string[]; // Array of parameter names
  assignedBy: string;
  assignedAt: string;
  isActive: boolean;
}

export interface UserAssignment {
  id: string;
  userId: string;
  projectId: string;
  districtIds: string[];
  parameterAssignments: ParameterAssignment[];
  assignedBy: string;
  assignedAt: string;
  isActive: boolean;
}

export interface WaterParameter {
  id: string;
  name: string;
  label: string;
  unit: string;
  category: 'physical' | 'chemical' | 'biological' | 'metals';
  min?: number;
  max?: number;
  optimal?: { min: number; max: number };
  required: boolean;
}

export interface ProjectParameter {
  id: string;
  projectId: string;
  parameterId: string;
  parameterName: string;
  isRequired: boolean;
  addedDate: string;
  addedBy: string;
}

export interface ProjectConfiguration {
  id: string;
  projectId: string;
  year: string;
  period: string;
  parameters: string[]; // Array of parameter names
  createdDate: string;
  updatedDate: string;
}
