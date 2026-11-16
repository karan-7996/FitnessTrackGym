export interface InteriorZone {
  id: string;
  name: string;
  category: 'strength' | 'cardio' | 'functional' | 'studio' | 'wellness' | 'nutrition';
  headline: string;
  description: string;
  equipment: string[];
  specs: { label: string; value: string }[];
  floorArea: string;
  capacity: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  outcome: string;
  quote: string;
  rating: number;
  memberDuration: string;
}

export interface Branch {
  id: string;
  slug: string;
  name: string;
  label: string;
  isHeadOffice?: boolean;
  buildingName: string;
  floor: string;
  floorNumber: number;
  totalFloors: number;
  fullAddress: string;
  locality: string;
  phones: string[];
  whatsappNumber: string;
  bg: string;
  panel: string;
  accent: string;
  ghostTitle: string;
  tagline: string;
  description: string;
  stats: {
    area: string;
    stations: string;
    trainers: string;
    members: string;
  };
  coordinates: {
    lat: number;
    lng: number;
    xPercent: number; // for custom stylized Vadodara Smart City map
    yPercent: number;
  };
  amenities: string[];
  keyEquipment: string[];
  interiorZones: InteriorZone[];
  testimonials: Testimonial[];
  videoHueRotate?: number; // CSS hue-rotation degrees to tint the video cover stage branch-wise
  buildingImage: string;
}

export const BRANCHES: Branch[] = [
  {
    id: 'subhanpura',
    slug: 'subhanpura-hq',
    name: 'SUBHANPURA',
    label: 'SUBHANPURA (HEAD OFFICE)',
    isHeadOffice: true,
    buildingName: 'Kirti Square',
    floor: '3rd Floor',
    floorNumber: 3,
    totalFloors: 6,
    fullAddress: '3rd Floor, Kirti Square, Subhanpura, Vadodara - 390023',
    locality: 'Subhanpura',
    phones: ['+91 95375 33345', '+91 99092 09698'],
    whatsappNumber: '919537533345',
    buildingImage: '/assets/aistudio/3rd_Floor_Kirti_Square_Subhanpura_Road_Above_Axis_Bank__Nr._Achariya_Hospital__Ellora_Park__Subhanpura__Vadodara__Gujarat_390023_f1324331.png',
    videoHueRotate: 215, // Crimson Red hue
    bg: '#B91C1C', // Crimson Power
    panel: '#DC2626',
    accent: '#FCA5A5',
    ghostTitle: 'HQ·SUBHANPURA',
    tagline: 'Flagship Headquarters & Olympic Strength Arena',
    description: 'Celebrating 13 years at the heart of Vadodara. 18,500 sq.ft of pure training power featuring Sahil Khan Merit Hall, competition platforms, and full wellness suite.',
    stats: {
      area: '18,500 sq.ft',
      stations: '110+ Units',
      trainers: '18 Certified',
      members: '3,200+ Active',
    },
    coordinates: {
      lat: 22.3275,
      lng: 73.1636,
      xPercent: 28,
      yPercent: 36,
    },
    amenities: ['Steam & Sauna Suites', 'Jerai & Being Strong Suite', 'InBody 570 Composition Lab', 'Dedicated Powerlifting Turf', 'Nutrition & Smoothie Bar', 'Valet Parking'],
    keyEquipment: ['Jerai Series X Power Racks', 'Being Strong Olympic Benches', 'LifeFitness Discover SE3', 'Eleiko Competition Plates'],
    interiorZones: [
      {
        id: 'iron-sanctuary',
        name: 'Olympic Free Weights & Heavy Iron',
        category: 'strength',
        headline: 'Heavy Duty Barbell & Dumbbell Arena',
        description: 'Engineered with calibrated Olympic barbells, custom FTG deadlift platforms, and urethane dumbbells ranging up to 65kg with acoustic shock flooring.',
        equipment: ['Being Strong Multi-Benches', 'Jerai Power Cages', 'Urethane DB Set 2.5kg - 65kg', 'Dual Cable Cross', 'Preacher Curl Station'],
        specs: [
          { label: 'Flooring', value: '30mm High-Density Recycled Vulcanized Rubber' },
          { label: 'Plate Rating', value: 'IWF Certified Competition Bumpers' },
          { label: 'Air Circulation', value: 'High-CFM HVAC + HEPA Filtration' },
        ],
        floorArea: '6,200 sq.ft',
        capacity: '60 Athletes',
      },
      {
        id: 'cardio-deck',
        name: 'Skyline Cardio Zone',
        category: 'cardio',
        headline: 'Heart-Rate Synchronized Endurance',
        description: 'Sweeping glass facade panoramic views overlooking Subhanpura with touch-screen entertainment, interactive hill simulation, and Polar telemetry.',
        equipment: ['LifeFitness SE3 Interactive Treadmills', 'Matrix ClimbMills (Stairmasters)', 'Concept2 RowERG', 'Impulse Air Bikes'],
        specs: [
          { label: 'Displays', value: '22" HD Immersive Course Screens' },
          { label: 'Shock Cushion', value: 'FlexDeck Impact Absorption System' },
        ],
        floorArea: '4,000 sq.ft',
        capacity: '40 Members',
      },
      {
        id: 'turf-crossfit',
        name: 'FTG Crossfit & Functional Cage',
        category: 'functional',
        headline: 'High-Intensity Athletic Performance',
        description: 'Indoor sprint turf track with push sleds, 24ft multi-rig suspension monkey bars, kettlebells, and Bulgarian sandbags for explosive conditioning.',
        equipment: ['25m Prowler Sled Track', 'Custom FTG Rig & Rings', 'Battle Ropes 50mm', 'Slam Balls 5-30kg', 'Plyometric Soft Boxes'],
        specs: [
          { label: 'Surface', value: '15mm Monofilament Agility Turf' },
          { label: 'Rig Anchor', value: 'Industrial Grade Heavy Steel' },
        ],
        floorArea: '3,800 sq.ft',
        capacity: '30 Members',
      },
      {
        id: 'wellness-recovery',
        name: 'Steam & Physiotherapy Suite',
        category: 'wellness',
        headline: 'Complete Post-Workout Recovery',
        description: 'State of the art steam rooms, hot showers, locker suites, and on-site certified sports physiotherapist counseling for injury prevention.',
        equipment: ['Nordic Eucalyptus Steam Rooms', 'Hydromassage Recovery Beds', 'Individual Digital Lockers', 'Grooming Vanities'],
        specs: [
          { label: 'Hygiene', value: 'Automated UV-C Sanitization' },
          { label: 'Temperature', value: 'Controlled 42°C Steam Chamber' },
        ],
        floorArea: '2,500 sq.ft',
        capacity: '25 Members',
      },
    ],
    testimonials: [
      {
        id: 't-sub-1',
        author: 'Devendra Shah',
        role: 'Senior IT Consultant',
        outcome: '-16 kg Fat Loss & 140kg Deadlift PR',
        quote: 'Training under Head Coach Rahul on the 3rd floor of Kirti Square changed my life. The Being Strong Olympic platforms and calibrated barbells are world-class.',
        rating: 5,
        memberDuration: 'Member for 3 Years',
      },
      {
        id: 't-sub-2',
        author: 'Dr. Meera Parikh',
        role: 'Physician & Marathoner',
        outcome: 'Reversed Pre-Diabetes & Increased VO2 Max',
        quote: 'The InBody 570 body composition scans and clinical diet advice helped me reverse my HbA1c to normal within 4 months. 13 years of fitness pedigree shows.',
        rating: 5,
        memberDuration: 'Member for 2 Years',
      },
      {
        id: 't-sub-3',
        author: 'Aakash Patel',
        role: 'Chartered Accountant',
        outcome: '+8 kg Lean Muscle Hypertrophy',
        quote: 'The Sahil Khan Merit Hall of Fame is pure motivation every evening. Steam bath post-workout is the best stress-buster in Subhanpura.',
        rating: 5,
        memberDuration: 'Member for 4 Years',
      },
    ],
  },
  {
    id: 'sama',
    slug: 'sama-lakeview',
    name: 'SAMA',
    label: 'SAMA BRANCH',
    buildingName: 'Paradise Complex',
    floor: '3rd Floor',
    floorNumber: 3,
    totalFloors: 5,
    fullAddress: '3rd Floor, Paradise Complex, Near Sama Talav, Sama, Vadodara - 390008',
    locality: 'Sama',
    phones: ['+91 70693 00817'],
    whatsappNumber: '917069300817',
    buildingImage: '/assets/aistudio/Near__3rd_Floor_Paradise_Complex__opp._Registrar__Talav__New_Sama__Vadodara__Gujarat_390024_4a6911a5.png',
    videoHueRotate: 0, // Natural Emerald Green
    bg: '#15803D', // Emerald Green
    panel: '#16A34A',
    accent: '#86EFAC',
    ghostTitle: 'SAMA·TALAV',
    tagline: 'Lakeview Panoramic Fitness with Premier Zumba & Yoga',
    description: 'Located right next to scenic Sama Talav. Natural sunlight, expansive floor space, and top-tier group fitness classes conducted by celebrity instructors.',
    stats: {
      area: '14,200 sq.ft',
      stations: '85+ Units',
      trainers: '12 Certified',
      members: '2,400+ Active',
    },
    coordinates: {
      lat: 22.3432,
      lng: 73.1934,
      xPercent: 58,
      yPercent: 18,
    },
    amenities: ['Lakeview Cardio Deck', 'Acoustic Zumba Studio', 'Yoga Sanctuary', 'Free Weights Area', 'Protein Bar', 'Personal Locker Rooms'],
    keyEquipment: ['Nautilus Inspiration Line', 'LifeFitness Cardio Suite', 'Jerai Benches & Racks', 'Reebok Studio Equipment'],
    interiorZones: [
      {
        id: 'lakeview-cardio',
        name: 'Lakeview Cardio Balcony',
        category: 'cardio',
        headline: 'Sweeping Views of Sama Talav',
        description: 'Run with unblocked morning sunrise views over the water. Equipped with low-impact commercial treadmills and interactive heart rate monitors.',
        equipment: ['LifeFitness 95T Engage Treadmills', 'Octane LateralX Ellipticals', 'Cybex Arc Trainers', 'Nautilus Recumbent Bikes'],
        specs: [
          { label: 'View', value: '180° Panoramic Lake View' },
          { label: 'Entertainment', value: 'Integrated Spotify & YouTube' },
        ],
        floorArea: '3,800 sq.ft',
        capacity: '35 Members',
      },
      {
        id: 'zumba-studio',
        name: 'FTG Beats Zumba & Dance Studio',
        category: 'studio',
        headline: 'High-Energy Group Choreography & HIIT',
        description: 'Shock-absorbing Canadian maple hardwood floor engineered to protect knees during intense Latin dance routines, Bollywood HIIT, and Aerobics.',
        equipment: ['Bose Pro Sound Array', 'Full Length Mirror Walls', 'Adjustable Aerobic Steps', 'Studio Dumbbell Racks'],
        specs: [
          { label: 'Flooring', value: 'Suspended Hardwood Spring Floor' },
          { label: 'Audio', value: '3000W Concert Acoustic Tuning' },
        ],
        floorArea: '3,200 sq.ft',
        capacity: '45 Dancers',
      },
      {
        id: 'sama-strength',
        name: 'Power & Hypertrophy Deck',
        category: 'strength',
        headline: 'Precision Biomechanical Machines',
        description: 'Complete range of pin-selected and plate-loaded Nautilus equipment designed to safely isolate muscles across optimal resistance arcs.',
        equipment: ['Nautilus Iso-Lateral Chest Press', 'Hack Squat & Leg Press Combo', 'Cable Functional Trainer', 'Jerai Dumbbell Station'],
        specs: [
          { label: 'Cables', value: 'Aircraft-grade 4.8mm Nylon Coated' },
          { label: 'Weights', value: 'Precision Laser Cut Steel' },
        ],
        floorArea: '5,000 sq.ft',
        capacity: '45 Athletes',
      },
    ],
    testimonials: [
      {
        id: 't-sam-1',
        author: 'Ananya Joshi',
        role: 'Interior Architect',
        outcome: 'Peak Cardiovascular Health & -9 kg',
        quote: 'Running on the 3rd-floor cardio deck watching the morning sunrise over Sama Talav is pure therapy. Coach Priya’s Zumba classes have unbelievable energy!',
        rating: 5,
        memberDuration: 'Member for 18 Months',
      },
      {
        id: 't-sam-2',
        author: 'Rohan Dave',
        role: 'Civil Project Engineer',
        outcome: '+6 kg Lean Muscle Mass',
        quote: 'The Nautilus biomechanical machines isolate muscles with zero joint friction. Friendly community and always spotless clean.',
        rating: 5,
        memberDuration: 'Member for 2 Years',
      },
    ],
  },
  {
    id: 'waghodia',
    slug: 'waghodia-ring-road',
    name: 'WAGHODIA ROAD',
    label: 'WAGHODIA ROAD BRANCH',
    buildingName: 'Nathdwara Avenue',
    floor: '5th Floor',
    floorNumber: 5,
    totalFloors: 7,
    fullAddress: '5th Floor, Nathdwara Avenue, Dabhoi Ring Road, Waghodia Rd, Vadodara - 390019',
    locality: 'Waghodia Road',
    phones: ['+91 76240 02274', '+91 82389 03345'],
    whatsappNumber: '917624002274',
    buildingImage: '/assets/aistudio/5th_Floor__Nathdwara_Avenue__Dabhoi_-_Waghodia_Ring_Rd__opp._Rukashmani_Party_Plot__nr._Parivar_Chowkdi__Waghodia__Vadodara__Gujarat_390025_895ebe07.png',
    videoHueRotate: 235, // Solar Orange/Gold
    bg: '#C2410C', // Solar Blaze
    panel: '#EA580C',
    accent: '#FDBA74',
    ghostTitle: 'WAGHODIA·5F',
    tagline: 'Penthouse High-Altitude Strength & Agility Facility',
    description: 'Elevated on the 5th floor of Nathdwara Avenue with towering high ceilings, 360-degree city cross breeze, and Vadodara’s longest indoor sprint track.',
    stats: {
      area: '16,000 sq.ft',
      stations: '95+ Units',
      trainers: '14 Certified',
      members: '2,800+ Active',
    },
    coordinates: {
      lat: 22.2981,
      lng: 73.2268,
      xPercent: 78,
      yPercent: 62,
    },
    amenities: ['Penthouse Skyline Views', '30m Sled Track', 'Heavy Bag Boxing Bay', 'Crossfit Rig', 'Steam Cabin', 'Diet Counseling Office'],
    keyEquipment: ['Being Strong Heavy Racks', 'Jerai Club Line', 'Fitking Plate-Loaded Systems', 'Assault Air Bikes'],
    interiorZones: [
      {
        id: 'skyline-floor',
        name: 'Penthouse Strength Arena',
        category: 'strength',
        headline: 'Open-Air Feel with Towering Ceilings',
        description: 'Vast space with zero pillars in core workout zones. Full sets of plate-loaded machines designed for raw muscle development and athletic power.',
        equipment: ['Being Strong Iso-Lateral Incline', 'Dual Hack Squat', '4-Station Cable Jungle', 'Heavy Olympic Deadlift Decks'],
        specs: [
          { label: 'Ceiling Height', value: '16-Foot Industrial Vaulted' },
          { label: 'Lighting', value: 'High-CRI Glare-Free Linear LEDs' },
        ],
        floorArea: '7,000 sq.ft',
        capacity: '55 Athletes',
      },
      {
        id: 'waghodia-functional',
        name: 'Athletic Sprint & Boxing Bay',
        category: 'functional',
        headline: 'Conditioning, Agility & Combat Fitness',
        description: 'Equipped with heavy hanging leather punching bags, speed bags, battle ropes, and sled track for heart-pumping conditioning workouts.',
        equipment: ['6 Heavy Leather Boxing Bags', 'Speed Bags & Double-End Balls', '30m Prowler Sprint Track', 'TRX Suspension Trainers'],
        specs: [
          { label: 'Combat Floor', value: 'Shock-Absorbing Tatami Mats' },
          { label: 'Agility Markers', value: 'Laser Inset Distance Lines' },
        ],
        floorArea: '4,500 sq.ft',
        capacity: '35 Members',
      },
    ],
    testimonials: [
      {
        id: 't-wag-1',
        author: 'Hardik Solanki',
        role: 'State Level Cricketer',
        outcome: 'FTPL Tournament Best All-Rounder',
        quote: 'The 30-meter indoor sprint turf on the 5th floor gives an insane rush. Pushing the heavy sleds and battle ropes here gave me unmatched sprint stamina.',
        rating: 5,
        memberDuration: 'Member for 2.5 Years',
      },
      {
        id: 't-wag-2',
        author: 'Jaydeep Patel',
        role: 'Industrial Parts Manufacturer',
        outcome: '-14 kg Weight Loss in 120 Days',
        quote: 'Towering 16-foot ceilings with 360-degree city breezes over Dabhoi Ring Road. No cramped feeling, heavy iron racks, and genuine coaches.',
        rating: 5,
        memberDuration: 'Member for 3 Years',
      },
    ],
  },
  {
    id: 'pratapnagar',
    slug: 'pratapnagar-skyline',
    name: 'PRATAPNAGAR',
    label: 'PRATAPNAGAR BRANCH',
    buildingName: 'Apsara Skyline',
    floor: '4th Floor',
    floorNumber: 4,
    totalFloors: 6,
    fullAddress: '4th Floor, Apsara Skyline, Opp. Alpana Talkies, Pratapnagar, Vadodara - 390004',
    locality: 'Pratapnagar',
    phones: ['+91 97255 68275'],
    whatsappNumber: '919725568275',
    buildingImage: '/assets/aistudio/4th_floor_Apsara_Skyline___Opp._Alpana_Talkies_Above_Honda_Showroom___Pratapnagar__Vadodara__Gujarat_390004_2e81cb8e.png',
    videoHueRotate: 95, // Indigo Titanium
    bg: '#4338CA', // Indigo Titanium
    panel: '#4F46E5',
    accent: '#A5B4FC',
    ghostTitle: 'PRATAPNAGAR',
    tagline: 'Hardcore Bodybuilding & Biomechanics Center',
    description: 'Opposite historic Alpana Talkies on the 4th floor of Apsara Skyline. Renowned for hardcore iron culture, competitive bodybuilders, and expert transformation coaches.',
    stats: {
      area: '13,500 sq.ft',
      stations: '80+ Units',
      trainers: '11 Certified',
      members: '2,100+ Active',
    },
    coordinates: {
      lat: 22.2885,
      lng: 73.2052,
      xPercent: 62,
      yPercent: 70,
    },
    amenities: ['Hardcore Heavy Iron Zone', 'Biomechanics Analysis', 'Boxing Cage', 'Custom Diet Plans', 'Steam Shower Suite', 'Supplements Hub'],
    keyEquipment: ['Evost Fitness Biomechanics', 'Jerai Club Master Racks', 'Nautilus Compound Machines', 'Concept2 Skierg'],
    interiorZones: [
      {
        id: 'pratap-hardcore',
        name: 'The Iron Pit',
        category: 'strength',
        headline: 'Old-School Intensity & Heavy Resistance',
        description: 'Tribute to classic bodybuilding with solid iron plates, thick grip bars, monolift attachments, and hardcore sound system tuned to push PRs.',
        equipment: ['Jerai Competition Racks', 'T-Bar Row with Chest Support', 'Belt Squat Machine', 'Steel Grip Dumbbells up to 60kg'],
        specs: [
          { label: 'Atmosphere', value: 'High Motivation & Dedicated Coaches' },
          { label: 'Equipment Finish', value: 'Textured Powder-Coated Grip' },
        ],
        floorArea: '6,000 sq.ft',
        capacity: '45 Lifters',
      },
      {
        id: 'transformation-lab',
        name: 'Body Composition & Assessment Lab',
        category: 'wellness',
        headline: 'Scientifically Measured Muscle Gain & Fat Loss',
        description: 'Private consultation room where coaches measure segmental muscle mass, body fat percentage, posture alignment, and tailor macro targets.',
        equipment: ['Medical-Grade Dual Frequency BIA Analyzer', 'Skinfold Calipers', 'Posture Grid Mirror Wall', 'Nutrition Tablet Portal'],
        specs: [
          { label: 'Report Format', value: 'Digital Cloud PDF & WhatsApp Sync' },
          { label: 'Frequency', value: 'Bi-Weekly Progress Scans' },
        ],
        floorArea: '1,500 sq.ft',
        capacity: '10 Consultations',
      },
    ],
    testimonials: [
      {
        id: 't-pra-1',
        author: 'Kunal Rajput',
        role: 'Competitive Physique Athlete',
        outcome: 'State Championship Silver Medalist',
        quote: 'Opposite Alpana Talkies, this 4th-floor iron pit is hardcore. The Evost Fitness machines and heavy dumbbells up to 60kg helped sculpt my contest prep.',
        rating: 5,
        memberDuration: 'Member for 4 Years',
      },
      {
        id: 't-pra-2',
        author: 'Vishal Barot',
        role: 'Branch Manager, HDFC',
        outcome: 'Posture Correction & Lower Back Pain Cured',
        quote: 'My personal trainer tailored specific core rehab exercises. Within two months, 8 years of chronic desk posture back pain disappeared completely.',
        rating: 5,
        memberDuration: 'Member for 1 Year',
      },
    ],
  },
  {
    id: 'tarsali',
    slug: 'tarsali-pancham',
    name: 'TARSALI',
    label: 'TARSALI BRANCH',
    buildingName: 'Pancham Avenue',
    floor: '3rd Floor',
    floorNumber: 3,
    totalFloors: 5,
    fullAddress: '3rd Floor, Pancham Avenue, Tarsali Ring Road, Vadodara - 390009',
    locality: 'Tarsali',
    phones: ['+91 70693 00474'],
    whatsappNumber: '917069300474',
    buildingImage: '/assets/aistudio/3rd___4th_Floor__Pancham_Avenue_Beside_Essar_Petrol_Pump__Sussen__Susen_-_Tarsali_Ring_Rd__Vadodara__Gujarat_390009_6cd27576.png',
    videoHueRotate: 250, // Amber Forge
    bg: '#B45309', // Amber Forge
    panel: '#D97706',
    accent: '#FDE68A',
    ghostTitle: 'TARSALI·RING',
    tagline: 'High-Capacity Strength & Conditioning Hub',
    description: 'Located right on Tarsali Ring Road with convenient highway access. Spacious workout floor with zero crowding, extensive free weights, and HIIT zone.',
    stats: {
      area: '15,000 sq.ft',
      stations: '90+ Units',
      trainers: '13 Certified',
      members: '2,600+ Active',
    },
    coordinates: {
      lat: 22.2612,
      lng: 73.2089,
      xPercent: 64,
      yPercent: 88,
    },
    amenities: ['Highway Connected Location', 'Reebok Functional Rig', 'Dedicated Abs Clinic', 'Cardio Cinema', 'Steam Baths', 'Full Parking Complex'],
    keyEquipment: ['Reebok Professional Rigs', 'Jerai Multi-Gym 8-Stack', 'Fitking Strength Pods', 'Impulse Curved Treadmills'],
    interiorZones: [
      {
        id: 'tarsali-strength',
        name: 'Heavy Compound & Free Weight Deck',
        category: 'strength',
        headline: 'Designed for Progressive Overload',
        description: 'Multiple bench presses, squat cages, and military press stations ensure zero waiting time during peak morning and evening workout hours.',
        equipment: ['4 Squat Cages with Pull-Up Grips', '6 Flat & Incline Bench Stations', 'Leg Press 45° 500kg Capacity', 'Complete DB Racks'],
        specs: [
          { label: 'Spacing', value: '3m Clearance Between Stations' },
          { label: 'Mirrors', value: 'Optically Pure Distortion-Free' },
        ],
        floorArea: '6,500 sq.ft',
        capacity: '50 Athletes',
      },
      {
        id: 'tarsali-hiit',
        name: 'HIIT & Abs Mastery Studio',
        category: 'functional',
        headline: 'Core Conditioning & Fat-Burn Circuits',
        description: 'Specialized area for FTG’s renowned Abs Class and high-intensity interval training workouts led by dedicated circuit instructors.',
        equipment: ['FTG Curved Self-Powered Treadmills', 'Ab Coaster Pro', 'Roman Chairs', 'Medicine Ball Rebounders'],
        specs: [
          { label: 'Structure', value: 'Circuit-Ready Interval Timers' },
          { label: 'Impact', value: 'Cushioned Shock Deck' },
        ],
        floorArea: '3,200 sq.ft',
        capacity: '30 Members',
      },
    ],
    testimonials: [
      {
        id: 't-tar-1',
        author: 'Sneha Makwana',
        role: 'High School Educator',
        outcome: '-3 Waist Sizes in 90 Days',
        quote: 'Joined the Abs Class and HIIT circuits on Tarsali Ring Road. The group energy is infectious and you burn 500+ calories without feeling bored for a second.',
        rating: 5,
        memberDuration: 'Member for 1.5 Years',
      },
      {
        id: 't-tar-2',
        author: 'Parthiv Mehta',
        role: 'Logistics Operations Director',
        outcome: '180kg Squat PR & Explosive Strength',
        quote: 'Multiple squat cages mean zero waiting around even during the 7:30 PM peak rush. Easy highway parking and solid equipment maintenance.',
        rating: 5,
        memberDuration: 'Member for 2 Years',
      },
    ],
  },
  {
    id: 'sayajigunj',
    slug: 'sayajigunj-ved-transcube',
    name: 'SAYAJIGUNJ',
    label: 'SAYAJIGUNJ (VED TRANSCUBE PLAZA)',
    buildingName: 'Ved Transcube Plaza',
    floor: '1st Floor',
    floorNumber: 1,
    totalFloors: 6,
    fullAddress: '1st Floor, Ved Transcube Plaza, Central Bus Station, Sayajigunj, Vadodara - 390002',
    locality: 'Sayajigunj',
    phones: ['+91 82389 03000'],
    whatsappNumber: '918238903000',
    buildingImage: '/assets/aistudio/1st_floor___187-188__Ved_Transcube_Plaza__Central_Bus_station__Maharaja_Sayajirao_University__Sayajiganj__Vadodara__Gujarat_390007_410e60f2.png',
    videoHueRotate: 55, // Electric Cyan
    bg: '#0369A1', // Electric Cyan
    panel: '#0284C7',
    accent: '#BAE6FD',
    ghostTitle: 'VED·TRANSCUBE',
    tagline: 'Prime City Center Transit Hub & Ultra-Modern Express Gym',
    description: 'Directly inside the landmark Ved Transcube Plaza at Vadodara Central Bus Station. Unbeatable accessibility for working professionals, university students, and commuters.',
    stats: {
      area: '17,200 sq.ft',
      stations: '100+ Units',
      trainers: '15 Certified',
      members: '3,100+ Active',
    },
    coordinates: {
      lat: 22.3106,
      lng: 73.1812,
      xPercent: 46,
      yPercent: 48,
    },
    amenities: ['Central Transit Hub Access', 'Express 45-Min Circuit', 'Impulse Cardio Matrix', 'Dedicated Locker & Shower Pods', 'Direct Mall Parking', 'Smoothie & Espresso Bar'],
    keyEquipment: ['Impulse Commercial Series', 'LifeFitness Cross-Trainers', 'Jerai Signature Weights', 'Evost Biomechanics'],
    interiorZones: [
      {
        id: 'sayaji-express',
        name: 'Express 45-Min Workout Zone',
        category: 'functional',
        headline: 'High Efficiency for Busy Commuters',
        description: 'Engineered for professionals who need a full-body workout in under an hour. Rapid-transition superset stations with guided digital timers.',
        equipment: ['Impulse Dual Circuit Machines', 'Kettlebell Quick-Load Racks', 'Self-Paced Treadmills', 'TRX Wall Anchors'],
        specs: [
          { label: 'Flow', value: 'Continuous Circular Station Layout' },
          { label: 'Showers', value: 'High-Pressure Fast Showers' },
        ],
        floorArea: '4,200 sq.ft',
        capacity: '40 Members',
      },
      {
        id: 'sayaji-strength',
        name: 'Signature Strength & Cable Deck',
        category: 'strength',
        headline: 'Heavy Duty Weight Training',
        description: 'Expansive machine room featuring multi-station cable machines, plate-loaded smith machines, and extensive free weight racks.',
        equipment: ['8-Stack Cable Jungle', 'Dual Counterbalanced Smith Machines', 'Glute Drive Machine', 'Heavy Dumbbell Rows'],
        specs: [
          { label: 'Air Quality', value: 'Continuous Fresh Air Inflow' },
          { label: 'Flooring', value: 'Rubberized Anti-Slip Texture' },
        ],
        floorArea: '6,800 sq.ft',
        capacity: '55 Lifters',
      },
    ],
    testimonials: [
      {
        id: 't-say-1',
        author: 'Chirag Brahmbhatt',
        role: 'Regional Sales Manager',
        outcome: 'Consistent 5-Day Weekly Routine Maintained',
        quote: 'Being inside Ved Transcube Plaza at Central Bus Station is unbeatable. I hit the 45-minute express circuit before catching my evening train with zero hassle.',
        rating: 5,
        memberDuration: 'Member for 2 Years',
      },
      {
        id: 't-say-2',
        author: 'Pratik Soni',
        role: 'MSU University Student',
        outcome: '-11 kg Fat Loss & Lean Muscle',
        quote: 'The student-friendly membership vibe, high-pressure hot shower pods, and FTG Nitro Whey shake bar keep me coming back every single day.',
        rating: 5,
        memberDuration: 'Member for 1 Year',
      },
    ],
  },
  {
    id: 'vasna-bhayli',
    slug: 'vasna-bhayli-shyamal',
    name: 'VASNA-BHAYLI',
    label: 'VASNA-BHAYLI BRANCH',
    buildingName: 'Shyamal Saphire',
    floor: '5th Floor',
    floorNumber: 5,
    totalFloors: 8,
    fullAddress: '5th Floor, Shyamal Saphire, Nr. Nilambar Circle, Vasna-Gotri 30 Mtr Rd, Vadodara - 390007',
    locality: 'Vasna-Bhayli',
    phones: ['+91 74053 18123', '+91 70693 00379'],
    whatsappNumber: '917405318123',
    buildingImage: '/assets/aistudio/5th_floor__shyamal_sapphire__Opp._chocolate_room__Nr.Nilamber_Circle___Vasna-_30_Mtr.road__Vasana__Gotri__Vadodara__Gujarat_390007_593fc45d.png',
    videoHueRotate: 125, // Royal Purple
    bg: '#7E22CE', // Royal Purple
    panel: '#9333EA',
    accent: '#E9D5FF',
    ghostTitle: 'VASNA·BHAYLI',
    tagline: 'Ultra-Luxury Boutique Fitness Club & Wellness Sanctuary',
    description: 'At the prestigious Nilambar Circle on Vasna-Gotri 30 Meter Road. Luxurious interior finishes, floor-to-ceiling glass, private VIP training studios, and peaceful yoga sanctuary.',
    stats: {
      area: '16,800 sq.ft',
      stations: '95+ Units',
      trainers: '14 Certified',
      members: '2,900+ Active',
    },
    coordinates: {
      lat: 22.3021,
      lng: 73.1345,
      xPercent: 12,
      yPercent: 54,
    },
    amenities: ['Nilambar Circle Skyline', 'Private VIP Training Suites', 'Yoga & Meditation Sanctuary', 'Organic Nutrition Bar', 'Luxury Steam & Jacuzzi Pods', 'Underground Covered Parking'],
    keyEquipment: ['Nautilus Modern Commercial', 'LifeFitness Platinum Club Series', 'Jerai Elite Heavy Racks', 'Woodway Curve Treadmills'],
    interiorZones: [
      {
        id: 'vasna-luxury-strength',
        name: 'Elite Strength & Biomechanics',
        category: 'strength',
        headline: 'World-Class Craftsmanship & Ergonomics',
        description: 'Custom finished in matte black and crimson accents. Seamless selectorized pin stacks and ergonomic grips designed for zero joint strain.',
        equipment: ['Nautilus Inspiration Chest & Shoulder', 'LifeFitness Signature Squat Racks', 'Urethane Black Dumbbells', 'Leg Extension & Curl Duals'],
        specs: [
          { label: 'Upholstery', value: 'Double-Stitched Marine-Grade Nappa Vinyl' },
          { label: 'Soundtrack', value: 'Curated High-Fidelity Audio' },
        ],
        floorArea: '6,200 sq.ft',
        capacity: '50 Athletes',
      },
      {
        id: 'vasna-yoga-sanctuary',
        name: 'Zen Yoga & Mind-Body Sanctuary',
        category: 'wellness',
        headline: 'Peaceful Restoration & Flexibility',
        description: 'Warm timber flooring, acoustic bamboo wall panels, adjustable ambient circadian lighting, and organic aromatherapy for restorative yoga and breathwork.',
        equipment: ['Manduka Pro Yoga Mats', 'Cork Blocks & Bolsters', 'Aerial Yoga Silk Hammocks', 'Sound Healing Singing Bowls'],
        specs: [
          { label: 'Noise Rating', value: 'STC 55 Acoustic Isolation' },
          { label: 'Aroma', value: 'Natural Lavender & Lemongrass Misting' },
        ],
        floorArea: '3,000 sq.ft',
        capacity: '35 Practitioners',
      },
    ],
    testimonials: [
      {
        id: 't-vas-1',
        author: 'Radhika Desai',
        role: 'Creative Director & Stylist',
        outcome: 'Mind-Body Wellness & Spinal Mobility',
        quote: 'The Nilambar Circle 5th-floor facility is sheer luxury. Floor-to-ceiling glass, natural daylight, and Sunday morning yoga in the timber sanctuary is bliss.',
        rating: 5,
        memberDuration: 'Member for 2 Years',
      },
      {
        id: 't-vas-2',
        author: 'Samir Chokshi',
        role: 'Real Estate Developer',
        outcome: '+5 kg Muscle & -8% Body Fat',
        quote: 'Private VIP training spaces, Woodway curve treadmills, and personal attention from master trainers. The most premium fitness facility in Vadodara.',
        rating: 5,
        memberDuration: 'Member for 3 Years',
      },
    ],
  },
  {
    id: 'karelibaug',
    slug: 'karelibaug-inspirom',
    name: 'KARELIBAUG',
    label: 'KARELIBAUG BRANCH',
    buildingName: 'Inspirom Building',
    floor: '2nd Floor',
    floorNumber: 2,
    totalFloors: 5,
    fullAddress: '2nd Floor, Inspirom Building, Nr Sangam Char Rasta, Karelibaug, Vadodara - 390018',
    locality: 'Karelibaug',
    phones: ['+91 95123 91888'],
    whatsappNumber: '919512391888',
    buildingImage: '/assets/aistudio/2nd_floor__Inspirom_Building__Sangam_Char_Rasta__Vijay_Nagar__Bapunagar__Vadodara__Gujarat_390006_df96d0f8.png',
    videoHueRotate: 75, // Cobalt Power
    bg: '#1D4ED8', // Cobalt Power
    panel: '#2563EB',
    accent: '#93C5FD',
    ghostTitle: 'KARELIBAUG',
    tagline: 'Community Powerhouse & Premier Strength Conditioning',
    description: 'Located right next to Sangam Char Rasta. Renowned for its electric community energy, friendly certified coaching, and dedicated female-friendly training zones.',
    stats: {
      area: '14,000 sq.ft',
      stations: '85+ Units',
      trainers: '12 Certified',
      members: '2,500+ Active',
    },
    coordinates: {
      lat: 22.3242,
      lng: 73.2045,
      xPercent: 66,
      yPercent: 38,
    },
    amenities: ['Sangam Char Rasta Hub', 'High-Energy Cardio Zone', 'Certified Nutrition Counseling', 'Dedicated Female Training Hours', 'Steam & Locker Suites', 'Easy Main Road Parking'],
    keyEquipment: ['Fitking Power Series', 'Jerai Commercial Benches', 'Being Strong Functional Rig', 'LifeFitness Cardio'],
    interiorZones: [
      {
        id: 'kareli-cardio',
        name: 'High-Energy Cardio Arena',
        category: 'cardio',
        headline: 'Calorie Burn & Cardiovascular Conditioning',
        description: 'Spacious cardiovascular training deck with rows of high-speed treadmills, elliptical cross trainers, and spin bikes equipped with digital RPM meters.',
        equipment: ['Fitking Commercial Treadmills', 'Spinning Pro Bikes', 'Synchro Cross Trainers', 'Rower Ergometers'],
        specs: [
          { label: 'Pacing', value: 'Heart Rate Zone Color Displays' },
          { label: 'Ventilation', value: 'Triple Turbo Fans & Fresh Air' },
        ],
        floorArea: '4,500 sq.ft',
        capacity: '40 Members',
      },
      {
        id: 'kareli-strength',
        name: 'Compound Power & Free Weights',
        category: 'strength',
        headline: 'Foundational Strength For All Fitness Levels',
        description: 'Welcoming strength zone with beginner-friendly guided pin-selected machines as well as heavy free weights for seasoned lifters.',
        equipment: ['Power Racks with Spotter Arms', 'Incline, Flat, and Decline Benches', 'Cable Crossover Machine', 'Leg Press & Calf Raise'],
        specs: [
          { label: 'Trainers', value: 'Dedicated Floor Coaches on Duty' },
          { label: 'Safety', value: 'Drop Mats and Safety Pins on all Racks' },
        ],
        floorArea: '5,500 sq.ft',
        capacity: '45 Athletes',
      },
    ],
    testimonials: [
      {
        id: 't-kar-1',
        author: 'Bhavna Trivedi',
        role: 'Homemaker & Community Volunteer',
        outcome: '-12 kg Transformation & Thyroid Stabilized',
        quote: 'The dedicated women-friendly training hours near Sangam Char Rasta made my fitness journey comfortable and empowering. Floor trainers are so supportive.',
        rating: 5,
        memberDuration: 'Member for 2 Years',
      },
      {
        id: 't-kar-2',
        author: 'Amit Panchal',
        role: 'Senior Financial Auditor',
        outcome: '120kg Bench Press & Athletic Agility',
        quote: 'Fitking power racks, constant form supervision, and certified sports nutrition guidance. Incredible family-like atmosphere.',
        rating: 5,
        memberDuration: 'Member for 2.5 Years',
      },
    ],
  },
];

export const GYM_SERVICES = [
  { id: 'gym-cardio', title: 'Gym & Cardio', desc: 'World-class imported equipment and extensive free weights.' },
  { id: 'pt', title: 'Personal Training', desc: '1-on-1 coaching with certified master trainers and custom workout protocols.' },
  { id: 'zumba', title: 'Zumba & Aerobics', desc: 'High-energy Latin and Bollywood dance fitness workouts.' },
  { id: 'yoga', title: 'Yoga & Flexibility', desc: 'Asanas, mobility flows, and breathwork for mind and body balance.' },
  { id: 'abs', title: 'Abs Class', desc: 'Dedicated 30-minute core conditioning and waistline sculpting sessions.' },
  { id: 'crossfit', title: 'Cross Fit & Functional', desc: 'Sled pushes, kettlebells, tire flips, and high-intensity interval conditioning.' },
  { id: 'diet', title: 'Diet & Nutrition Plans', desc: 'Tailored calorie & macro meal plans customized for your lifestyle.' },
  { id: 'hiit', title: 'HIIT & Group Activity', desc: 'Group team circuits, FTPL Cricket Tournament & FTZD community sports.' },
];

export const INSTRUMENT_BRANDS = [
  'JERAI FITNESS LTD',
  'BEING STRONG',
  'NAUTILUS',
  'LIFEFITNESS',
  'FITKING',
  'EVOST FITNESS',
  'REEBOK',
  'IMPULSE',
];

export const MEMBERSHIP_PLANS = [
  { duration: '1 Month', price: '₹3,500', popular: false, badge: 'Starter' },
  { duration: '3 Months', price: '₹7,777', popular: false, badge: 'Quarterly' },
  { duration: '6 Months', price: '₹11,999', popular: true, badge: 'Most Popular' },
  { duration: '12 Months', price: '₹16,999', popular: false, badge: 'Best Value' },
  { duration: '24 Months', price: '₹29,999', popular: false, badge: 'VIP Elite' },
];

export const PT_PLANS = [
  { duration: '4 Weeks', price: '₹9,000', sessions: '12 Sessions (3 PT / Week - MFW/TTS)' },
  { duration: '12 Weeks', price: '₹25,000', sessions: '36 Sessions with Certified Master Trainer' },
  { duration: '25 Weeks', price: '₹45,000', sessions: '75 Sessions + Body Composition & Full Diet Plan' },
];

export const NUTRITION_PRODUCTS = [
  {
    name: 'FTG Nitro Whey',
    subtitle: 'Explosive Muscle Recovery · Fast. Pure. Powerful.',
    desc: '24g Protein, 3g Creatine Monohydrate, 500mg Ashwagandha, 500mg Tribulus Terrestris.',
    flavours: 'Chocolate Fudge & Malai Kulfi',
  },
  {
    name: 'FTG Alpha Isolate',
    subtitle: 'Lead the Pack with Lean Power · Ultra-Pure',
    desc: '27g Protein, 12.7g EAA, 0 Sugar. Fast absorption for lean shredded muscle.',
    flavours: 'Belgium Chocolate, Cafe Mocha, Malai Kulfi',
  },
  {
    name: 'FTG Beta Whey',
    subtitle: 'Build from the Base · Grow with Beta',
    desc: '24g Protein, 10.7g EAA, 4.22g Glutamine. Daily performance for beginners to intermediates.',
    flavours: 'Chocolate Fudge, Malai Kulfi & Mix Berries',
  },
];
