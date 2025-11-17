// components/icons.ts
"use client";

export {
  //Standard
  ListCheck, RotateCcw, RotateCw, RefreshCcw, RefreshCw, AlertTriangle, CheckSquare, ExternalLink, SlidersHorizontal,
  Link, Check, Component, HelpCircle, ScanLine,
  GitMerge, CheckCircle, Replace, ReplaceAll, Package, PackagePlus, Users, Waypoints, Table,
  Lightbulb, Trash,
    //Text Symbols
    Ampersand, Ellipsis,
    //Common Symbols,
    Heart, Diamond, Spade, Club, Target, Goal, Trophy, Puzzle, Key, Lock, LockOpen, LockKeyhole, LockKeyholeOpen,
    Badge, Cross,
            //ChessKing, ChessKnight, ChessPawn, ChessRook, ChessBishop, ChessQueen,
    //Directions
    ChevronUp, ChevronDown, ChevronLeft, ChevronRight, ChevronsUp, ChevronsDown, ChevronsRight, ChevronsLeft,
    ChevronsDownUp, ChevronsLeftRight, ChevronsRightLeft, ChevronsUpDown, 
    ArrowRight, ArrowLeft, ArrowRightLeft, ArrowUp, ArrowDown, ArrowUpDown,
    Signpost,
    //Books
    Book, BookOpen, BookCopy, BookText, BookMarked,
    //Supplies
    PencilRuler, Briefcase, PenBox, Paperclip, Pen, Pencil, Compass, Map, Notebook, Highlighter, Calculator, Ruler,
    //Media
    Volume, Volume1, Volume2, VolumeOff, VolumeX, Tv, Play, Pause, /*Stop as Square*/ Mic, MicOff, Loader, LoaderCircle, Shuffle,
    ListPlus, ListMinus, ListStart, ListEnd,
    //Pizzaz
    Sparkle, Wand, WandSparkles,

  //Math
    Equal, EqualNot, EqualApproximately, Plus, Minus, X, SlashIcon, Diff, Pi, Percent, Parentheses, Dot,
    SquarePlus, SquareMinus, SquareX, SquareDivide, SquareRadical, SquarePercent, SquareEqual, SquareChevronUp, 
    CirclePlus, CircleMinus, CircleX, CircleDivide, CirclePercent, CircleEqual, CircleChevronUp, CircleSlash,
    //Algebra
      SquareFunction, Sigma, Variable, TrendingDown, TrendingUpDown, TrendingUp, LineChart, Grid3X3, Grid2X2,
    //Geometry
      Shapes, Triangle, TriangleDashed, TriangleRight, Square, Circle, Squircle, Pentagon, CircleDashed, CircleDot, CircleDotDashed, 
      Hexagon, Octagon, RectangleHorizontal, RectangleVertical,
      Globe, Cone, Pyramid, Box, Boxes, Torus, Cylinder, Cuboid, Radius, Diameter, Tangent,
      Move3D, Axis3d, Spline, Rotate3D, MoveHorizontal, MoveVertical, MoveDiagonal, Move, 
    //Statistics / Probability
      Dices, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Tally1, Tally2, Tally3, Tally4, Tally5, 
      ChartScatter, AreaChart, BarChart, PieChart, GanttChartSquare,
  //Computer Science
    Binary, Network, BrainCircuit, Database, CircuitBoard, Server, Terminal, BrainCog, CircleGauge, Gauge,

  //Science
    Atom, Zap, Waves, Microscope, Flame,
    Orbit, Eclipse, Rocket, Moon, MoonStar, Sun, Star, Telescope,
    Dna, Biohazard, Radiation, 
    Sprout, Flower, Flower2, Rose, Leaf, Shrub, TreeDeciduous, TreePalm, TreePine, Trees,
    Bird, Birdhouse, Bug, Cat, Dog, Panda, PawPrint, Mouse, Snail, Shrimp, Shell, Squirrel, Turtle, Worm, Rabbit,
    Beaker, FlaskConical, FlaskRound, Pipette, TestTube, TestTubes,
    Earth, Gem, Mountain, MountainSnow,
    Cloud, CloudDrizzle, CloudRain, CloudSnow, CloudFog, CloudLightning, CloudMoon, CloudMoonRain, CloudRainWind, CloudHail, CloudSunRain, CloudSun, Cloudy,
    Droplet, DropletOff, Droplets, Haze, Rainbow, Snowflake, SunDim, SunMedium, SunSnow, Sunrise, Sunset,
    Thermometer, ThermometerSnowflake, ThermometerSun, Tornado, Umbrella, UmbrellaOff, Wind,

  //Social Science
    //Communications
      Speech, Handshake,
    //Buildings
      House, Building, Building2, Factory, Castle, Church, Landmark, School, Home, Store, Theater, University, Hospital, Hotel, UtilityPole, Warehouse,
      Tent, TentTree,
    //Household
      AirVent, AlarmSmoke, Fan, FireExtinguisher, Heater, HousePlug, Usb, SatelliteDish,
      HouseWifi, Router, Wifi,
      Lamp, LampCeiling, LampDesk, LampFloor, LampWallDown, LampWallUp,
      Microwave, Refrigerator, ShowerHead, Toilet, WashingMachine, Bath,
      Armchair, Bed, BedDouble, BedSingle, RockingChair, Sofa,
      Blinds, BrickWall, DoorClosed, DoorOpen, DoorClosedLocked as DoorLocked, Fence, 
      BellElectric as SchoolBell, Vault, WavesLadder,
      BrushCleaning, PaintRoller, Paintbrush, PaintbrushVertical, SoapDispenserDroplet, ToolCase,
    //Economics
      DollarSign, Euro, Bitcoin, CreditCard, HandCoins, PiggyBank, Banknote, BanknoteArrowUp, BanknoteArrowDown,
    //Law
      Gavel, Scale,
    //Life
      Baby,

  //Huamnities
      Palette,
    //Weaponry
      Sword, Swords, Shield, BowArrow, Bomb,
    //Music
      Music as EighthNotes, Music2 as EighthNote, Music3 as QuarterNote, Music4 as SixteenthNotes,
      DiscAlbum,
      Drum, Piano, Guitar,
    //Food and Drink
      Apple, Banana, Grape, Citrus, Cherry, Carrot, LeafyGreen,
      Bean, Wheat, Nut, 
      Beef, Ham, Drumstick, Egg, EggFried, Fish, 
      Pizza, Hamburger, Popcorn, Salad, Sandwich, Soup,
      Donut, Cookie, Croissant, Cake, CakeSlice, Candy, CandyCane, IceCream, IceCreamBowl, IceCreamCone, Popsicle, Lollipop,
      GlassWater, CupSoda, Beer, Wine, Milk, Coffee, BottleWine, Martini,
      Utensils, UtensilsCrossed, CookingPot, ChefHat, 
      Vegan, BeerOff, CandyOff, FishOff, EggOff, DnaOff, WineOff, WheatOff, BeanOff, MilkOff, NutOff,
    //Culture
      VenetianMask, RollerCoaster,
    //Sports
      Volleyball, Dumbbell, 
  
  //Technology
    Phone, Text, Camera, CameraOff, Search, Info, Menu, Cast, Smartphone, Power, PowerOff, Signal, QrCode, Bluetooth,
    Flashlight, CloudUpload, CloudDownload, Upload, Download, 
    Gamepad as GamepadClassic, Gamepad2 as Controller, GamepadDirectional, Disc3, Headset, Headphones,
    FlameKindling, Wrench, Drill, Pickaxe, Shovel, Hourglass, Bolt, Hammer, Binoculars,
  //Medicine
    Accessibility, Ambulance, Siren, Bandage, LifeBuoy, Pill, PillBottle, Syringe, Stethoscope,
    ClipboardMinus, ClipboardPlus, Cannabis,
    Brain, Bone, HeartCrack, HeartPulse, Eye, EyeClosed as EyeLash, EyeOff, Ear, EarOff, 
    Cigarette, CigaretteOff,
    Mars, Venus, Transgender, VenusAndMars,
  //Transportation
    Car, CarTaxiFront, Bike, Bus, BusFront, Motorbike, Truck, TruckElectric,
    Ship, ShipWheel, Anchor, Kayak, Sailboat,
    Plane, BaggageClaim, Drone, PlaneLanding, PlaneTakeoff, TowerControl, Luggage,
    TrainTrack, Train, TrainFront, TrainFrontTunnel, CableCar, TramFront,
    Forklift, Tractor,
    ParkingMeter, CircleParking, Container, EvCharger, Fuel, TrafficCone,
    Tickets, Ticket,

  //Spooky
  Ghost,
} 
from "lucide-react";