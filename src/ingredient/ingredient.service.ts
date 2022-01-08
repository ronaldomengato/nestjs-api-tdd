import { Injectable } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { Ingredient } from './ingredient.entity';
import { IngredientRepository } from './ingredient.repository';

@Injectable()
export class IngredientService {
  constructor(private repository: IngredientRepository) {}

  public async createIngredient(
    ingredientDto: CreateIngredientDto,
  ): Promise<Ingredient> {
    return this.repository.createIngredient(ingredientDto);
  }
}
