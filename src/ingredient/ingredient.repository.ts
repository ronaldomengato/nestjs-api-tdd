import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { validateOrReject } from 'class-validator';

import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { Ingredient } from './ingredient.entity';

@EntityRepository(Ingredient)
export class IngredientRepository extends Repository<Ingredient> {
  async createIngredient(
    createIngredientDto: CreateIngredientDto,
  ): Promise<Ingredient> {
    const ingredient = new Ingredient();
    ingredient.name = createIngredientDto.name;
    ingredient.measureUnit = createIngredientDto.measureUnit;
    ingredient.price = createIngredientDto.price;
    try {
      await validateOrReject(ingredient);
      await this.save(ingredient);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return ingredient;
  }

  async getIngredients(name: string) {
    const result = await this.find({ where: { name } });

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }
}
