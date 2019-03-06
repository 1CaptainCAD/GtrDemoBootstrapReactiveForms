import { InMemoryDbService } from 'angular-in-memory-web-api';

import { IGuitarBrand } from './guitar-brand';
import { IGuitar } from './guitar';
import { GuitarType } from './guitar-type.enum';

export class GuitarData implements InMemoryDbService {

  createDb() {

    const brands: IGuitarBrand[] = [
      {id: 1, brandName: 'Martin'},
      {id: 2, brandName: 'Taylor'},
      {id: 3, brandName: 'Fender'},
      {id: 4, brandName: 'Gibson'},
      {id: 5, brandName: 'Yamaha'}
    ];

    const guitars: IGuitar[] = [
      {
        id: 1,
        brandId: 1, // Martin
        stringType: 'steel',
        guitarType: GuitarType.acoustic,
        numberOfStrings: 6,
        numberOfFrets: 20,
        scaleLength: 25.4,
        modelNumber: 'D-45E',
        price: 9429.00,
        description: 'Top of the line Martin guitar',
        rating: 5,
        imageUrl: '../../../assets/Images/MartinGuitar.jpg'
      },
      {
        id: 2,
        brandId: 1, // Martin
        stringType: 'steel',
        guitarType: GuitarType.acoustic,
        numberOfStrings: 6,
        numberOfFrets: 20,
        scaleLength: 25.4,
        modelNumber: 'DCPA4',
        price: 1499.00,
        description: 'Natural finish mid level professional guitar',
        rating: 4.5,
        imageUrl: '../../../assets/Images/MartinGuitar.jpg'
      },
      {
        id: 3,
        brandId: 1, // Martin
        stringType: 'steel',
        guitarType: GuitarType.acoustic,
        numberOfStrings: 6,
        numberOfFrets: 20,
        scaleLength: 23,
        modelNumber: 'LX1E',
        price: 439.00,
        description: 'Little Martin guitar for beginners',
        rating: 3.5,
        imageUrl: '../../../assets/Images/MartinGuitar.jpg'
      },
      {
        id: 4,
        brandId: 2, // Taylor
        stringType: 'steel',
        guitarType: GuitarType.acoustic,
        numberOfStrings: 6,
        numberOfFrets: 20,
        scaleLength: 25.5,
        modelNumber: 'LX1E',
        price: 4999.00,
        description: 'Top of the line Taylor guitar',
        rating: 5,
        imageUrl: '../../../assets/Images/TaylorGuitar.png'
      },
      {
        id: 5,
        brandId: 2, // Taylor
        stringType: 'steel',
        guitarType: GuitarType.acoustic,
        numberOfStrings: 6,
        numberOfFrets: 20,
        scaleLength: 25.5,
        modelNumber: '214ce',
        price: 1399.00,
        description: 'Middle of the road Taylor guitar',
        rating: 3,
        imageUrl: '../../../assets/Images/TaylorGuitar.png'
      },
      {
        id: 6,
        brandId: 3, // Fender
        stringType: 'steel',
        guitarType: GuitarType.electric,
        numberOfStrings: 6,
        numberOfFrets: 22,
        scaleLength: 25.5,
        modelNumber: 'Stratocaster',
        price: 1099.00,
        description: 'Classic Fender Strat',
        rating: 5,
        imageUrl: '../../../assets/Images/FenderStrat.jpg'
      },
      {
        id: 7,
        brandId: 3, // Fender
        stringType: 'steel',
        guitarType: GuitarType.electric,
        numberOfStrings: 6,
        numberOfFrets: 22,
        scaleLength: 25.5,
        modelNumber: 'Telecaster',
        price: 859.00,
        description: 'Classic Fender Tele',
        rating: 5,
        imageUrl: '../../../assets/Images/FenderTele.jpg'
      },
      {
        id: 8,
        brandId: 4, // Gibson
        stringType: 'steel',
        guitarType: GuitarType.electric,
        numberOfStrings: 6,
        numberOfFrets: 22,
        scaleLength: 24.75,
        modelNumber: 'Les Paul',
        price: 1299.00,
        description: 'Classic Gibson Les Paul',
        rating: 5,
        imageUrl: '../../../assets/Images/GibsonLesPaul.jpg'
      },
      {
        id: 9,
        brandId: 4, // Gibson
        stringType: 'steel',
        guitarType: GuitarType.electric,
        numberOfStrings: 6,
        numberOfFrets: 22,
        scaleLength: 24.75,
        modelNumber: 'SG',
        price: 1099.00,
        description: 'Classic Gibson SG',
        rating: 5,
        imageUrl: '../../../assets/Images/GibsonSG.jpg'
      },
      {
        id: 10,
        brandId: 5, // Yamaha
        stringType: 'steel',
        guitarType: GuitarType.acoustic,
        numberOfStrings: 6,
        numberOfFrets: 22,
        scaleLength: 24.75,
        modelNumber: 'FGX830c',
        price: 469.00,
        description: 'Yamaha Dreadnought cutaway natural',
        rating: 3,
        imageUrl: '../../../assets/Images/YamahaAcoustic.jpg'
      },
      {
        id: 11,
        brandId: 5, // Yamaha
        stringType: 'steel',
        guitarType: GuitarType.acoustic,
        numberOfStrings: 6,
        numberOfFrets: 22,
        scaleLength: 24.75,
        modelNumber: 'A3M ARE',
        price: 899.00,
        description: 'Yamaha jumbo guitar natural',
        rating: 4,
        imageUrl: '../../../assets/Images/YamahaAcoustic.jpg'
      }
    ];
    return {brands, guitars};
  }
}
