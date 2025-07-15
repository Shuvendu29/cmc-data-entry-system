import { District } from '../types';

// OUTFALL Districts with comprehensive station coverage and precise coordinates
export const OUTFALL_DISTRICTS: District[] = [
  { 
    id: '1', 
    name: 'Jagatsingpur', 
    code: 'JGS-OF',
    stations: [
      { 
        id: 'OF-JAG001', 
        code: 'JAG-1', 
        name: 'Jatadhari Outfall Station', 
        location: 'Jatadhari Coastal Monitoring Point', 
        justification: 'Coastal water quality monitoring for industrial and municipal discharge impact',
        cpcbRef: 'jatadhari',
        cpcbCode: 'JAG-1',
        latitude: '20.22485°N',
        longitude: '86.59161°E',
        latitudeDec: 20.22485,
        longitudeDec: 86.59161,
        isActive: true 
      },
      { 
        id: 'OF-JAG002', 
        code: 'JAG-2', 
        name: 'Jag-1 Outfall Station', 
        location: 'Jagatsingpur District Coastal Monitoring Point', 
        justification: 'Primary coastal discharge monitoring for regional industrial activities',
        cpcbRef: 'jag-1',
        cpcbCode: 'JAG-2',
        latitude: '20.29123°N',
        longitude: '86.70725°E',
        latitudeDec: 20.29123,
        longitudeDec: 86.70725,
        isActive: true 
      },
      { 
        id: 'OF-JAG003', 
        code: 'JAG-3', 
        name: 'Hansua Outfall Station', 
        location: 'Hansua Coastal Monitoring Point', 
        justification: 'Downstream monitoring for cumulative discharge impact assessment',
        cpcbRef: 'hansua',
        cpcbCode: 'JAG-3',
        latitude: '20.05560°N',
        longitude: '86.43059°E',
        latitudeDec: 20.05560,
        longitudeDec: 86.43059,
        isActive: true 
      }
    ]
  },
  { 
    id: '2', 
    name: 'Bhadrak', 
    code: 'BHD-OF',
    stations: [
      { 
        id: 'OF-BDK001', 
        code: 'BDK-1', 
        name: 'Motianadi Outfall Station', 
        location: 'Motianadi River Discharge Monitoring Point', 
        justification: 'River mouth discharge monitoring for upstream industrial impact',
        cpcbRef: 'motianadi',
        cpcbCode: 'BDK-1',
        latitude: '20.65375°N',
        longitude: '86.85162°E',
        latitudeDec: 20.65375,
        longitudeDec: 86.85162,
        isActive: true 
      },
      { 
        id: 'OF-BDK002', 
        code: 'BDK-2', 
        name: 'Kulanadi Outfall Station', 
        location: 'Kulanadi Discharge Monitoring Point', 
        justification: 'Industrial and municipal discharge impact assessment',
        cpcbRef: 'kulanadi',
        cpcbCode: 'BDK-2',
        latitude: '20.79829°N',
        longitude: '86.91428°E',
        latitudeDec: 20.79829,
        longitudeDec: 86.91428,
        isActive: true 
      }
      // Additional Bhadrak stations...
    ]
  }
  // Additional districts...
];
