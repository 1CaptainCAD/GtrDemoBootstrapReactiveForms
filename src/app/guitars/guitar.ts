import {GuitarType} from './guitar-type.enum';

export interface IGuitar {
  id: number | null;
  brandId: number;
  stringType: string;
  guitarType: GuitarType;
  numberOfStrings: number;
  numberOfFrets: number;
  scaleLength: number;
  modelNumber: string;
  price: number;
  description: string;
  rating: number;
  imageUrl: string;
}
