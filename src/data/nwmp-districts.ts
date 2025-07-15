import { District } from '../types';

// NWMP Districts with comprehensive station coverage
export const NWMP_DISTRICTS: District[] = [
  { 
    id: '1', 
    name: 'Jagatsingpur', 
    code: 'JGS',
    stations: [
      { 
        id: 'JGS001', 
        code: '4975', 
        name: 'Jatadhari C (N)', 
        location: 'Jatadhari Muhana (North)',
        justification: '• River confluence • Industrial activity of Paradip • Township Discharge',
        iczmprRef: 'P5',
        cpcbRef: 'P-4',
        cpcbCode: '4975',
        isActive: true 
      },
      { 
        id: 'JGS002', 
        code: '4976', 
        name: 'Jatadhari C', 
        location: 'Jatadhari Muhan',
        justification: '• River confluence • Industrial activity of Paradip • Township Discharge',
        iczmprRef: 'P6',
        cpcbRef: 'P-3',
        cpcbCode: '4976',
        isActive: true 
      },
      { 
        id: 'JGS003', 
        code: '4977', 
        name: 'Jatadhari C (S)-1', 
        location: 'Jatadhari Muhan South',
        justification: '',
        iczmprRef: 'P8',
        cpcbRef: 'P-1',
        cpcbCode: '4977',
        isActive: true 
      },
      { 
        id: 'JGS004', 
        code: '4978', 
        name: 'Jatadhari C (S)-2', 
        location: 'Jatadhari Muhana South 2',
        justification: '',
        iczmprRef: 'P7',
        cpcbRef: 'P-2',
        cpcbCode: '4978',
        isActive: true 
      },
      { 
        id: 'JGS005', 
        code: '4979', 
        name: 'Jatadhari Muhana C (S)-3', 
        location: 'Jatadhari Muhana (2.5 km from shore)',
        justification: '',
        iczmprRef: 'P11',
        cpcbRef: 'P-11',
        cpcbCode: '4979',
        isActive: true 
      },
      { 
        id: 'JGS006', 
        code: '4980', 
        name: 'Jatadhari muhana C (S)-4', 
        location: 'Jatadhari Muhana South (5 Km from Shore)',
        justification: '',
        iczmprRef: 'P16',
        cpcbRef: 'P-14',
        cpcbCode: '4980',
        isActive: true 
      },
      { 
        id: 'JGS007', 
        code: '4981', 
        name: 'Jatadhari Muhana C (N)-5', 
        location: 'Jatadhari Muhana North (5 Km from Shore)',
        justification: '',
        iczmprRef: 'P17',
        cpcbRef: 'P-15',
        cpcbCode: '4981',
        isActive: true 
      },
      { 
        id: 'JGS008', 
        code: '4982', 
        name: 'Paradeep Port (N)-1', 
        location: 'Paradeep Port North',
        justification: 'Influenced by Port activities',
        iczmprRef: 'M1',
        cpcbRef: 'P-7',
        cpcbCode: '4982',
        isActive: true 
      },
      { 
        id: 'JGS009', 
        code: '4983', 
        name: 'Paradeep Port', 
        location: 'Paradeep Port',
        justification: '',
        iczmprRef: 'P1',
        cpcbRef: 'P-6',
        cpcbCode: '4983',
        isActive: true 
      },
      { 
        id: 'JGS010', 
        code: '4984', 
        name: 'Paradeep Port (S)-1', 
        location: 'Paradeep Port South',
        justification: '',
        iczmprRef: 'P3',
        cpcbRef: 'P-5',
        cpcbCode: '4984',
        isActive: true 
      },
      { 
        id: 'JGS011', 
        code: '4985', 
        name: 'Paradeep Port (N)-2', 
        location: 'Paradeep Port North (2.5 Km from shore)',
        justification: 'Influenced by Port activities',
        iczmprRef: 'M2',
        cpcbRef: 'P-12',
        cpcbCode: '4985',
        isActive: true 
      },
      { 
        id: 'JGS012', 
        code: '4986', 
        name: 'Paradeep Port (S)-2', 
        location: 'Paradeep Port South (5 Km from port entrance)',
        justification: '',
        iczmprRef: 'P18',
        cpcbRef: 'P-16',
        cpcbCode: '4986',
        isActive: true 
      },
      { 
        id: 'JGS013', 
        code: '4987', 
        name: 'Mahanadi Muhana C-1', 
        location: 'Mahanadi Muhana',
        justification: 'Estuary of Mahanadi ecotone area influenced by Industry/township',
        iczmprRef: 'M6',
        cpcbRef: 'P-8',
        cpcbCode: '4987',
        isActive: true 
      },
      { 
        id: 'JGS014', 
        code: '4988', 
        name: 'Mahanadi Muhana N-1', 
        location: 'Mahanadi Muhana North',
        justification: '',
        iczmprRef: 'M8',
        cpcbRef: 'P-9',
        cpcbCode: '4988',
        isActive: true 
      },
      { 
        id: 'JGS015', 
        code: '4989', 
        name: 'Mahanadi Muhana N-2', 
        location: 'Mahanadi Muhana up North (2.5 Km from shore)',
        justification: 'River discharges and is a Ecological Sensitive zone',
        iczmprRef: 'M9',
        cpcbRef: 'P-13',
        cpcbCode: '4989',
        isActive: true 
      },
      { 
        id: 'JGS016', 
        code: '4990', 
        name: 'Mahanadi Muhana N-3', 
        location: 'Mahanadi Muhana North (5 Km from Shore)',
        justification: 'River',
        iczmprRef: 'M10',
        cpcbRef: 'P-18',
        cpcbCode: '4990',
        isActive: true 
      },
      { 
        id: 'JGS017', 
        code: '4991', 
        name: 'Mahanadi Muhana (S)', 
        location: 'Mahanadi Muhana South (5 Km from Shore)',
        justification: 'River',
        iczmprRef: 'M7',
        cpcbRef: 'P-17',
        cpcbCode: '4991',
        isActive: true 
      },
      { 
        id: 'JGS018', 
        code: '4992', 
        name: 'Mahanadi Muhana/Estuary', 
        location: 'Mahanadi Muhana/Estuary',
        justification: 'River',
        iczmprRef: 'M5',
        cpcbRef: 'P-19',
        cpcbCode: '4992',
        isActive: true 
      },
      { 
        id: 'JGS019', 
        code: '4993', 
        name: 'Hukitola', 
        location: 'Hukitola',
        justification: 'River',
        iczmprRef: 'M14',
        cpcbRef: 'P-10',
        cpcbCode: '4993',
        isActive: true 
      },
      { 
        id: 'JGS020', 
        code: '4994', 
        name: 'Mahanadi Muhana C-2', 
        location: 'Mahanadi Muhana (5 Km from shore)',
        justification: 'River',
        iczmprRef: 'MH2',
        cpcbRef: 'P-20',
        cpcbCode: '4994',
        isActive: true 
      }
    ]
  },
  { 
    id: '2', 
    name: 'Bhadrak', 
    code: 'BHD',
    stations: [
      { 
        id: 'BHD001', 
        code: '5009', 
        name: 'Dhamra C -1', 
        location: 'Dhamra Muhan',
        justification: 'Brahmani, Baitarini and Dhamra river',
        iczmprRef: 'D8',
        cpcbRef: 'D-1',
        cpcbCode: '5009',
        isActive: true 
      },
      { 
        id: 'BHD002', 
        code: '5010', 
        name: 'Dhamra C -2', 
        location: 'Dhamra Muhana',
        justification: 'Brahmani, Baitarini and Dhamra river',
        iczmprRef: 'D5',
        cpcbRef: 'D-2',
        cpcbCode: '5010',
        isActive: true 
      },
      { 
        id: 'BHD003', 
        code: '5011', 
        name: 'Dhamra C (N)', 
        location: 'Dhamra Muhan North',
        justification: 'Dhamra Port activities',
        iczmprRef: 'D1',
        cpcbRef: 'D-3',
        cpcbCode: '5011',
        isActive: true 
      },
      { 
        id: 'BHD004', 
        code: '5012', 
        name: 'Kanakprasad -1', 
        location: 'Kanakprasad -1',
        justification: '• River influence • Port activities',
        iczmprRef: 'D2',
        cpcbRef: 'D-4',
        cpcbCode: '5012',
        isActive: true 
      },
      { 
        id: 'BHD005', 
        code: '5013', 
        name: 'Kanakprasad -2', 
        location: 'Kanakprasad -2',
        justification: '',
        iczmprRef: 'D3',
        cpcbRef: 'D-5',
        cpcbCode: '5013',
        isActive: true 
      },
      { 
        id: 'BHD006', 
        code: '5014', 
        name: 'Dhamra Port 2', 
        location: 'Dhamra Port 2',
        justification: '',
        iczmprRef: 'D4',
        cpcbRef: 'D-6',
        cpcbCode: '5014',
        isActive: true 
      }
    ]
  },
  { 
    id: '3', 
    name: 'Kendrapara', 
    code: 'KDP',
    stations: [
      { 
        id: 'KDP001', 
        code: '5015', 
        name: 'Kendrapara Central Station', 
        location: 'Kendrapara Town',
        justification: 'Central monitoring point for district water quality',
        iczmprRef: 'K1',
        cpcbRef: 'K-1',
        cpcbCode: '5015',
        isActive: true 
      },
      { 
        id: 'KDP002', 
        code: '5016', 
        name: 'Mahanadi Confluence', 
        location: 'Mahanadi River Confluence',
        justification: 'Major river confluence monitoring',
        iczmprRef: 'K2',
        cpcbRef: 'K-2',
        cpcbCode: '5016',
        isActive: true 
      },
      { 
        id: 'KDP003', 
        code: '5017', 
        name: 'Bhitarkanika Monitoring', 
        location: 'Bhitarkanika National Park',
        justification: 'Mangrove ecosystem monitoring',
        iczmprRef: 'K3',
        cpcbRef: 'K-3',
        cpcbCode: '5017',
        isActive: true 
      }
    ]
  },
  { 
    id: '4', 
    name: 'Puri', 
    code: 'PUR',
    stations: [
      { 
        id: 'PUR001', 
        code: '5018', 
        name: 'Puri Beach Station', 
        location: 'Puri Beach',
        justification: 'Tourist area coastal water monitoring',
        iczmprRef: 'P1',
        cpcbRef: 'PR-1',
        cpcbCode: '5018',
        isActive: true 
      },
      { 
        id: 'PUR002', 
        code: '5019', 
        name: 'Jagannath Temple Area', 
        location: 'Near Jagannath Temple',
        justification: 'Religious tourism area monitoring',
        iczmprRef: 'P2',
        cpcbRef: 'PR-2',
        cpcbCode: '5019',
        isActive: true 
      },
      { 
        id: 'PUR003', 
        code: '5020', 
        name: 'Konark Monitoring Point', 
        location: 'Konark Sun Temple Area',
        justification: 'Heritage site coastal monitoring',
        iczmprRef: 'P3',
        cpcbRef: 'PR-3',
        cpcbCode: '5020',
        isActive: true 
      }
    ]
  },
  { 
    id: '5', 
    name: 'Balasore', 
    code: 'BAL',
    stations: [
      { 
        id: 'BAL001', 
        code: '5021', 
        name: 'Balasore Port Station', 
        location: 'Balasore Port',
        justification: 'Port area water quality monitoring',
        iczmprRef: 'B1',
        cpcbRef: 'B-1',
        cpcbCode: '5021',
        isActive: true 
      },
      { 
        id: 'BAL002', 
        code: '5022', 
        name: 'Chandipur Monitoring', 
        location: 'Chandipur Beach',
        justification: 'Unique tidal beach monitoring',
        iczmprRef: 'B2',
        cpcbRef: 'B-2',
        cpcbCode: '5022',
        isActive: true 
      },
      { 
        id: 'BAL003', 
        code: '5023', 
        name: 'Subarnarekha Estuary', 
        location: 'Subarnarekha River Estuary',
        justification: 'River-sea confluence monitoring',
        iczmprRef: 'B3',
        cpcbRef: 'B-3',
        cpcbCode: '5023',
        isActive: true 
      }
    ]
  },
  { 
    id: '6', 
    name: 'Ganjam', 
    code: 'GAN',
    stations: [
      { 
        id: 'GAN001', 
        code: '5024', 
        name: 'Berhampur Coastal Station', 
        location: 'Berhampur Coast',
        justification: 'Southern Odisha coastal monitoring',
        iczmprRef: 'G1',
        cpcbRef: 'G-1',
        cpcbCode: '5024',
        isActive: true 
      },
      { 
        id: 'GAN002', 
        code: '5025', 
        name: 'Gopalpur Port', 
        location: 'Gopalpur Port Area',
        justification: 'Port operations impact monitoring',
        iczmprRef: 'G2',
        cpcbRef: 'G-2',
        cpcbCode: '5025',
        isActive: true 
      },
      { 
        id: 'GAN003', 
        code: '5026', 
        name: 'Rushikulya Estuary', 
        location: 'Rushikulya River Estuary',
        justification: 'Turtle nesting beach monitoring',
        iczmprRef: 'G3',
        cpcbRef: 'G-3',
        cpcbCode: '5026',
        isActive: true 
      }
    ]
  }
];
