import { District, WaterQualityParameters } from '../types';
import { NWMP_DISTRICTS } from '../data/nwmp-districts';
import { ICZMP_DISTRICTS } from '../data/iczmp-districts';
import { OUTFALL_DISTRICTS } from '../data/outfall-districts';

// Helper function to get districts by project
export function getDistrictsByProject(projectId: string): District[] {
  switch (projectId) {
    case '1': return NWMP_DISTRICTS;
    case '2': return ICZMP_DISTRICTS;
    case '3': return OUTFALL_DISTRICTS;
    default: return [];
  }
}

// Helper function to get total stations across all projects
export function getTotalStations(): number {
  const nwmpStations = NWMP_DISTRICTS.reduce((acc, district) => acc + district.stations.length, 0);
  const iczmprStations = ICZMP_DISTRICTS.reduce((acc, district) => acc + district.stations.length, 0);
  const outfallStations = OUTFALL_DISTRICTS.reduce((acc, district) => acc + district.stations.length, 0);
  
  return nwmpStations + iczmprStations + outfallStations;
}

// Helper function to get total districts across all projects
export function getTotalDistricts(): number {
  return NWMP_DISTRICTS.length + ICZMP_DISTRICTS.length + OUTFALL_DISTRICTS.length;
}

// Helper function to get parameters by project type
export function getParametersByProject(projectId: string): WaterQualityParameters {
  // This would return the appropriate parameter set based on project type
  // For now, returning a basic set
  return {
    temperature: { min: 0, max: 50, unit: '°C', optimal: { min: 20, max: 35 }, label: 'Temperature (°C)' },
    pH: { min: 0, max: 14, unit: 'pH units', optimal: { min: 7.5, max: 8.5 }, label: 'pH' },
    conductivity: { min: 0, max: 100, unit: 'mS/cm', optimal: { min: 30, max: 60 }, label: 'Conductivity (mS/cm)' },
    dissolvedOxygen: { min: 0, max: 20, unit: 'mg/L', optimal: { min: 5, max: 8 }, label: 'Dissolved Oxygen (mg/L)' },
  };
}
