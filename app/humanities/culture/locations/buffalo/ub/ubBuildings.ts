export type Campus = 'North' | 'South' | 'Downtown';
export type BuildingType = 'Academic' | 'Athletics' | 'Housing' | 'Support' | 'Medical';

export interface Building {
  id: string;
  name: string;
  campus: Campus;
  type: BuildingType;
  lat: number;
  lng: number;
  desc: string;
}

export const UB_BUILDINGS: Building[] = [
  // --- NORTH CAMPUS: THE ACADEMIC SPINE ---
  {
    id: 'capen',
    name: 'Capen Hall',
    campus: 'North',
    type: 'Academic',
    lat: 43.0009,
    lng: -78.7896,
    desc: "The nerve center. Home to the Silverman Library, One World Café, and the President's Office. "
  },
  {
    id: 'lockwood',
    name: 'Lockwood Library',
    campus: 'North',
    type: 'Academic',
    lat: 43.0004,
    lng: -78.7860,
    desc: "The main academic library. Famous for its rigorous quiet study floors and extensive cybraries."
  },
  {
    id: 'student_union',
    name: 'Student Union',
    campus: 'North',
    type: 'Support',
    lat: 43.0012,
    lng: -78.7865,
    desc: "The social heartbeat. Features the Flag Room, Tim Hortons, and the Ticket Office. The primary meeting point for students."
  },
  {
    id: 'obrian',
    name: 'O\'Brian Hall',
    campus: 'North',
    type: 'Academic',
    lat: 43.0018,
    lng: -78.7885,
    desc: "Home of the School of Law. Contains the Law Library and mock courtrooms."
  },
  {
    id: 'baldy',
    name: 'Baldy Hall',
    campus: 'North',
    type: 'Academic',
    lat: 43.0015,
    lng: -78.7880,
    desc: "Graduate School of Education. Connected to the spine, bridging the gap between Law and the Student Union."
  },
  {
    id: 'clemens',
    name: 'Clemens Hall',
    campus: 'North',
    type: 'Academic',
    lat: 43.0008,
    lng: -78.7850,
    desc: "The Humanities hub. English, History, and Romance Languages departments. Known for its distinct brick tower profile."
  },
  {
    id: 'nsc',
    name: 'Natural Sciences Complex',
    campus: 'North',
    type: 'Academic',
    lat: 43.0015,
    lng: -78.7845,
    desc: "Lecture hall behemoth. Contains the largest lecture centers on campus (NSC 201/225). Chemistry and Geology labs."
  },
  
  // --- NORTH CAMPUS: ENGINEERING & ARTS ---
  {
    id: 'davis',
    name: 'Davis Hall',
    campus: 'North',
    type: 'Academic',
    lat: 43.0025,
    lng: -78.7875,
    desc: "School of Engineering flagship. A striking glass building with advanced clean rooms and smart-grid labs."
  },
  {
    id: 'jarvis',
    name: 'Jarvis Hall',
    campus: 'North',
    type: 'Academic',
    lat: 43.0022,
    lng: -78.7870,
    desc: "Support for engineering and applied sciences. Connected directly to Davis Hall."
  },
  {
    id: 'cfa',
    name: 'Center for the Arts',
    campus: 'North',
    type: 'Academic',
    lat: 42.9985,
    lng: -78.7845,
    desc: "Performance and visual arts hub. Features the Mainstage Theatre and the UB Art Gallery. Overlooks Lake LaSalle."
  },
  {
    id: 'alumni',
    name: 'Alumni Arena',
    campus: 'North',
    type: 'Athletics',
    lat: 42.9995,
    lng: -78.7820,
    desc: "Home of UB Basketball and Wrestling. Features a comprehensive fitness center and the Triple Gym."
  },
  {
    id: 'stadium',
    name: 'UB Stadium',
    campus: 'North',
    type: 'Athletics',
    lat: 42.9992,
    lng: -78.7785,
    desc: "The gridiron. 29,000 seat stadium hosting UB Bulls Football and Track & Field. Notorious for high winds."
  },

  // --- NORTH CAMPUS: HOUSING ---
  {
    id: 'ellicott',
    name: 'Ellicott Complex',
    campus: 'North',
    type: 'Housing',
    lat: 43.0070,
    lng: -78.7750,
    desc: "The 'Lego City'. A massive, self-contained dormitory complex (6 buildings) designed to block the wind. Easy to get lost in."
  },
  {
    id: 'greiner',
    name: 'Greiner Hall',
    campus: 'North',
    type: 'Housing',
    lat: 43.0030,
    lng: -78.7780,
    desc: "LEED Gold certified sophomore housing. Modern design with 'pod' style suites and classrooms inside the dorm."
  },
  {
    id: 'governors',
    name: 'Governors Complex',
    campus: 'North',
    type: 'Housing',
    lat: 43.0035,
    lng: -78.7910,
    desc: "Freshman-focused housing located near the academic spine. Known for its tight-knit community and dining hall."
  },

  // --- SOUTH CAMPUS ---
  {
    id: 'hayes',
    name: 'Hayes Hall',
    campus: 'South',
    type: 'Academic',
    lat: 42.9535,
    lng: -78.8180,
    desc: "The icon of South Campus. Home to the School of Architecture. Its clocktower is a Buffalo landmark."
  },
  {
    id: 'abbott',
    name: 'Abbott Hall',
    campus: 'South',
    type: 'Academic',
    lat: 42.9528,
    lng: -78.8165,
    desc: "Health Sciences Library. A critical resource for the medical, dental, and pharmacy schools on South Campus."
  },
  {
    id: 'clark',
    name: 'Clark Hall',
    campus: 'South',
    type: 'Athletics',
    lat: 42.9545,
    lng: -78.8155,
    desc: "Historic gymnasium with a classic pool and basketball courts. The primary recreation center for South residents."
  },
  {
    id: 'wende',
    name: 'Wende Hall',
    campus: 'South',
    type: 'Academic',
    lat: 42.9522,
    lng: -78.8170,
    desc: "Home to the School of Nursing. Recently renovated with high-tech simulation labs."
  },
  {
    id: 'kimball',
    name: 'Kimball Tower',
    campus: 'South',
    type: 'Academic',
    lat: 42.9515,
    lng: -78.8150,
    desc: "School of Public Health and Health Professions. A high-rise providing views of the city."
  },

  // --- DOWNTOWN CAMPUS ---
  {
    id: 'jacobs',
    name: 'Jacobs School of Medicine',
    campus: 'Downtown',
    type: 'Medical',
    lat: 42.9005,
    lng: -78.8690,
    desc: "State-of-the-art medical facility located on the Buffalo Niagara Medical Campus. Directly connected to the Metro Rail."
  },
  {
    id: 'gateway',
    name: 'Gateway Building',
    campus: 'Downtown',
    type: 'Support',
    lat: 42.9015,
    lng: -78.8685,
    desc: "Provides community outreach and clinical services. A key link between UB and the city of Buffalo."
  }
];