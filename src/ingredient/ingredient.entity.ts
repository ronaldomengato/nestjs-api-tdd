import { IsIn } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { measurementUnits } from './dto/create-ingredient.dto';

@Entity()
export class Ingredient extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  @IsIn(measurementUnits)
  measureUnit: string;

  @Column({ type: 'float' })
  price: number;
}
