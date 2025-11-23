export interface Car {
  _id: string;
  brandName: string;
  carName: string;
  price: number;
  imageUrl: string;
  manufacturingYear: number;
  bodyType: string;
  currency: string;
  condition: string;
  trim?: string;
  isHighlighted?: boolean;
  highlightMessage?: string;
  periodType?: string;
  contractPeriod?: number;
  dailyRate?: number;
  lastMileage?: number;
  strikedPrice?: number;
}
