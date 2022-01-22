import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { validateOrReject } from 'class-validator';
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

  public async getIngredients(name?: string) {
    let result: Ingredient[];
    if (name) {
      result = await this.repository.getIngredients(name);
    } else {
      result = await this.repository.find();
    }
    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  public async updateIngredient(
    ingredientId: number,
    ingredientDto: CreateIngredientDto,
  ) {
    try {
      const entity = await this.repository.findOneOrFail(ingredientId);
      if (!entity) {
        throw new NotFoundException();
      }
      entity.name = ingredientDto.name;
      entity.measureUnit = ingredientDto.measureUnit;
      entity.price = ingredientDto.price;
      await validateOrReject(entity);
      return this.repository.save(entity);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
