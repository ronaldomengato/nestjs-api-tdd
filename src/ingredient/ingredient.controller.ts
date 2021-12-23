import { Body, Controller, Post } from '@nestjs/common';
import { IngredientService } from './ingredient.service';

@Controller('ingredient')
export class IngredientController {
  constructor(private service: IngredientService) {}

  @Post()
  public save(@Body() ingredientDto: any) {
    this.service.save(ingredientDto);
  }
}
