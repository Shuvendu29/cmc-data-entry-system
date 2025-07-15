import { District } from '../types';

// ICZMP Districts with specialized monitoring stations
export const ICZMP_DISTRICTS: District[] = [
  { 
    id: '1', 
    name: 'Paradeep', 
    code: 'PAR',
    stations: [
      // Mahanadi Fishing Jetty (2 stations - LT/HT)
      { id: 'PAR001', code: 'MNFJ-LT', name: 'Mahanadi Fishing Jetty', location: 'Mahanadi Fishing Jetty', stationType: 'E', influence: 'FJ', latitude: "20°17'22.3''N", longitude: "86°42'23.1''E", distanceFromShore: '0', tide: 'LT', samplingDepth: 'S', stretch: 'Paradeep-1', depth: '2.5', sachiDepth: '1.8', isActive: true },
      { id: 'PAR002', code: 'MNFJ-HT', name: 'Mahanadi Fishing Jetty', location: 'Mahanadi Fishing Jetty', stationType: 'E', influence: 'FJ', latitude: "20°17'22.3''N", longitude: "86°42'23.1''E", distanceFromShore: '0', tide: 'HT', samplingDepth: 'S', stretch: 'Paradeep-1', depth: '2.5', sachiDepth: '1.8', isActive: true },
      
      // Mahanadi U/s (2 stations - LT/HT)
      { id: 'PAR003', code: 'MR1-LT', name: 'Mahanadi U/s', location: 'Mahanadi Upstream', stationType: 'R', influence: 'R', latitude: "20°19'40.24''N", longitude: "86°39'44.97''E", distanceFromShore: '0', tide: 'LT', samplingDepth: 'S', stretch: 'Paradeep-2', depth: '8.2', sachiDepth: '6.5', isActive: true },
      { id: 'PAR004', code: 'MR1-HT', name: 'Mahanadi U/s', location: 'Mahanadi Upstream', stationType: 'R', influence: 'R', latitude: "20°19'40.24''N", longitude: "86°39'44.97''E", distanceFromShore: '0', tide: 'HT', samplingDepth: 'S', stretch: 'Paradeep-2', depth: '8.2', sachiDepth: '6.5', isActive: true },
      
      // Mahanadi Shore 1 (2 stations - LT/HT)
      { id: 'PAR005', code: 'MS1-LT', name: 'Mahanadi Shore 1', location: 'Mahanadi Shore 1', stationType: 'S', influence: 'I', latitude: "20°17'55.37''N", longitude: "86°41'10.47''E", distanceFromShore: '0', tide: 'LT', samplingDepth: 'S', stretch: 'Paradeep-3', depth: '1.5', sachiDepth: '1.2', isActive: true },
      { id: 'PAR006', code: 'MS1-HT', name: 'Mahanadi Shore', location: 'Mahanadi Shore', stationType: 'S', influence: 'I', latitude: "20°17'55.37''N", longitude: "86°41'10.47''E", distanceFromShore: '0', tide: 'HT', samplingDepth: 'S', stretch: 'Paradeep-3', depth: '1.5', sachiDepth: '1.2', isActive: true },
      
      // IFFCo Channel (2 stations - LT/HT)
      { id: 'PAR007', code: 'MH2-LT', name: 'IFFCo Channel', location: 'IFFCo Channel', stationType: 'R', influence: 'I', latitude: "20°17'55.3''N", longitude: "86°41'10.5''E", distanceFromShore: '0', tide: 'LT', samplingDepth: 'S', stretch: 'Paradeep-4', depth: '4.8', sachiDepth: '3.2', isActive: true },
      { id: 'PAR008', code: 'MH2-HT', name: 'IFFCo Channel', location: 'IFFCo Channel', stationType: 'R', influence: 'I', latitude: "20°17'55.3''N", longitude: "86°41'10.5''E", distanceFromShore: '0', tide: 'HT', samplingDepth: 'S', stretch: 'Paradeep-4', depth: '4.8', sachiDepth: '3.2', isActive: true },
      
      // Athara Banki Creek (2 stations - LT/HT)
      { id: 'PAR009', code: 'AB-LT', name: 'Athara Banki Creek', location: 'Athara Banki Creek', stationType: 'R', influence: 'I', latitude: "20°17'15.85''N", longitude: "86°41'59.34''E", distanceFromShore: '0', tide: 'LT', samplingDepth: 'S', stretch: 'Paradeep-5', depth: '3.6', sachiDepth: '2.8', isActive: true },
      { id: 'PAR010', code: 'AB-HT', name: 'Athara Banki Creek', location: 'Athara Banki Creek', stationType: 'R', influence: 'I', latitude: "20°17'15.85''N", longitude: "86°41'59.34''E", distanceFromShore: '0', tide: 'HT', samplingDepth: 'S', stretch: 'Paradeep-5', depth: '3.6', sachiDepth: '2.8', isActive: true }
    ]
  },
  { 
    id: '2', 
    name: 'Gahirmatha', 
    code: 'GAH',
    stations: [
      // Gahirmatha Sea 1 (2 stations - LT/HT)
      { id: 'GAH001', code: 'GS1-LT', name: 'Gahirmatha Sea 1', location: 'Gahirmatha Sea 1', stationType: 'S', influence: 'O', latitude: "20°41'44.17''N", longitude: "87°02'36.00''E", distanceFromShore: '1.5', tide: 'LT', samplingDepth: 'S', stretch: 'Gahirmatha-1', depth: '12.5', sachiDepth: '8.2', isActive: true },
      { id: 'GAH002', code: 'GS1-HT', name: 'Gahirmatha Sea 1', location: 'Gahirmatha Sea 1', stationType: 'S', influence: 'O', latitude: "20°41'44.17''N", longitude: "87°02'36.00''E", distanceFromShore: '1.5', tide: 'HT', samplingDepth: 'S', stretch: 'Gahirmatha-1', depth: '12.5', sachiDepth: '8.2', isActive: true },
      
      // Gahirmatha Sea 2 (2 stations - LT/HT)
      { id: 'GAH003', code: 'GS2-LT', name: 'Gahirmatha Sea 2', location: 'Gahirmatha Sea 2', stationType: 'S', influence: 'O', latitude: "20°41'44.17''N", longitude: "87°08'36.00''E", distanceFromShore: '5.0', tide: 'LT', samplingDepth: 'S', stretch: 'Gahirmatha-2', depth: '18.7', sachiDepth: '12.5', isActive: true },
      { id: 'GAH004', code: 'GS2-HT', name: 'Gahirmatha Sea 2', location: 'Gahirmatha Sea 2', stationType: 'S', influence: 'O', latitude: "20°41'44.17''N", longitude: "87°08'36.00''E", distanceFromShore: '5.0', tide: 'HT', samplingDepth: 'S', stretch: 'Gahirmatha-2', depth: '18.7', sachiDepth: '12.5', isActive: true },
      
      // Gahirmatha Sea 3 (2 stations - LT/HT)
      { id: 'GAH005', code: 'GS3-LT', name: 'Gahirmatha Sea 3', location: 'Gahirmatha Sea 3', stationType: 'S', influence: 'O', latitude: "20°41'44.17''N", longitude: "87°14'36.00''E", distanceFromShore: '10.0', tide: 'LT', samplingDepth: 'S', stretch: 'Gahirmatha-3', depth: '25.2', sachiDepth: '16.8', isActive: true },
      { id: 'GAH006', code: 'GS3-HT', name: 'Gahirmatha Sea 3', location: 'Gahirmatha Sea 3', stationType: 'S', influence: 'O', latitude: "20°41'44.17''N", longitude: "87°14'36.00''E", distanceFromShore: '10.0', tide: 'HT', samplingDepth: 'S', stretch: 'Gahirmatha-3', depth: '25.2', sachiDepth: '16.8', isActive: true },
      { id: 'GAH007', code: 'HR-LT', name: 'Hansua River', location: 'Hansua River', stationType: 'R', influence: 'R', latitude: "20°42'30.0''N", longitude: "87°01'15.0''E", distanceFromShore: '0', tide: 'LT', samplingDepth: 'S', stretch: 'Gahirmatha-4', depth: '5.8', sachiDepth: '4.2', isActive: true },
      { id: 'GAH008', code: 'HR-HT', name: 'Hansua River', location: 'Hansua River', stationType: 'R', influence: 'R', latitude: "20°42'30.0''N", longitude: "87°01'15.0''E", distanceFromShore: '0', tide: 'HT', samplingDepth: 'S', stretch: 'Gahirmatha-4', depth: '5.8', sachiDepth: '4.2', isActive: true },
      { id: 'GAH009', code: 'DR-LT', name: 'Devi River', location: 'Devi River', stationType: 'R', influence: 'R', latitude: "20°40'45.0''N", longitude: "87°00'30.0''E", distanceFromShore: '0', tide: 'LT', samplingDepth: 'S', stretch: 'Gahirmatha-5', depth: '6.5', sachiDepth: '4.8', isActive: true },
      { id: 'GAH010', code: 'DR-HT', name: 'Devi River', location: 'Devi River', stationType: 'R', influence: 'R', latitude: "20°40'45.0''N", longitude: "87°00'30.0''E", distanceFromShore: '0', tide: 'HT', samplingDepth: 'S', stretch: 'Gahirmatha-5', depth: '6.5', sachiDepth: '4.8', isActive: true }
    ]
  },
  { 
    id: '3', 
    name: 'Dhamara', 
    code: 'DHM',
    stations: [
      { id: 'DHM001', code: 'DS1-LT', name: 'Dhamara Sea 1', location: 'Dhamara Sea 1', stationType: 'S', influence: 'O', latitude: "20°54'00.0''N", longitude: "87°05'00.0''E", distanceFromShore: '1.5', tide: 'LT', samplingDepth: 'S', stretch: 'Dhamara-1', depth: '14.2', sachiDepth: '9.8', isActive: true },
      { id: 'DHM002', code: 'DS1-HT', name: 'Dhamara Sea 1', location: 'Dhamara Sea 1', stationType: 'S', influence: 'O', latitude: "20°54'00.0''N", longitude: "87°05'00.0''E", distanceFromShore: '1.5', tide: 'HT', samplingDepth: 'S', stretch: 'Dhamara-1', depth: '14.2', sachiDepth: '9.8', isActive: true },
      { id: 'DHM003', code: 'DS2-LT', name: 'Dhamara Sea 2', location: 'Dhamara Sea 2', stationType: 'S', influence: 'O', latitude: "20°54'00.0''N", longitude: "87°11'00.0''E", distanceFromShore: '5.0', tide: 'LT', samplingDepth: 'S', stretch: 'Dhamara-2', depth: '22.5', sachiDepth: '15.2', isActive: true },
      { id: 'DHM004', code: 'DS2-HT', name: 'Dhamara Sea 2', location: 'Dhamara Sea 2', stationType: 'S', influence: 'O', latitude: "20°54'00.0''N", longitude: "87°11'00.0''E", distanceFromShore: '5.0', tide: 'HT', samplingDepth: 'S', stretch: 'Dhamara-2', depth: '22.5', sachiDepth: '15.2', isActive: true },
      { id: 'DHM005', code: 'DMR-LT', name: 'Dhamara River', location: 'Dhamara River', stationType: 'R', influence: 'R', latitude: "20°53'30.0''N", longitude: "87°03'45.0''E", distanceFromShore: '0', tide: 'LT', samplingDepth: 'S', stretch: 'Dhamara-3', depth: '7.8', sachiDepth: '5.5', isActive: true },
      { id: 'DHM006', code: 'DMR-HT', name: 'Dhamara River', location: 'Dhamara River', stationType: 'R', influence: 'R', latitude: "20°53'30.0''N", longitude: "87°03'45.0''E", distanceFromShore: '0', tide: 'HT', samplingDepth: 'S', stretch: 'Dhamara-3', depth: '7.8', sachiDepth: '5.5', isActive: true },
      { id: 'DHM007', code: 'DP-LT', name: 'Dhamara Port', location: 'Dhamara Port', stationType: 'P', influence: 'I', latitude: "20°53'15.0''N", longitude: "87°04'00.0''E", distanceFromShore: '0', tide: 'LT', samplingDepth: 'S', stretch: 'Dhamara-4', depth: '12.0', sachiDepth: '8.5', isActive: true },
      { id: 'DHM008', code: 'DP-HT', name: 'Dhamara Port', location: 'Dhamara Port', stationType: 'P', influence: 'I', latitude: "20°53'15.0''N", longitude: "87°04'00.0''E", distanceFromShore: '0', tide: 'HT', samplingDepth: 'S', stretch: 'Dhamara-4', depth: '12.0', sachiDepth: '8.5', isActive: true },
      { id: 'DHM009', code: 'BC-LT', name: 'Bhitarkanika Channel', location: 'Bhitarkanika Channel', stationType: 'R', influence: 'N', latitude: "20°52'30.0''N", longitude: "87°02'15.0''E", distanceFromShore: '0', tide: 'LT', samplingDepth: 'S', stretch: 'Dhamara-5', depth: '4.5', sachiDepth: '3.2', isActive: true },
      { id: 'DHM010', code: 'BC-HT', name: 'Bhitarkanika Channel', location: 'Bhitarkanika Channel', stationType: 'R', influence: 'N', latitude: "20°52'30.0''N", longitude: "87°02'15.0''E", distanceFromShore: '0', tide: 'HT', samplingDepth: 'S', stretch: 'Dhamara-5', depth: '4.5', sachiDepth: '3.2', isActive: true }
    ]
  }
];
