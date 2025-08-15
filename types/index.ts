// Types for house features
interface HouseFeature {
  type: 'Board and Batten' | 'Entry Door' | 'Fascia' | 'Garage Door' | 'Horizontal Siding' | 'Roof' | 'Shakes' | 'Stone' | 'Stucco' | 'Trim' | 'Vertical Siding';
  confidence: number;
  segmentation: any;
}

interface LightSuggestion {
  x: number;
  y: number;
  type: 'string' | 'idk'
}