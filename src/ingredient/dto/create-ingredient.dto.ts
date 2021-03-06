import { IsString, IsIn, IsNumber } from 'class-validator';

export const measurementUnits: string[] = ['kg', 'ml', 'l', 'g'];
export class CreateIngredientDto {
  @IsString()
  name: string;
  @IsNumber()
  price: number;
  @IsIn(measurementUnits)
  measureUnit: string;
}
