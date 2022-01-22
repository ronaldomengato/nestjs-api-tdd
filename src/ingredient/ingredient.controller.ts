import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { IngredientService } from './ingredient.service';

@Controller('ingredients')
export class IngredientController {
  constructor(private service: IngredientService) {}

  @Post()
  public save(
    @Body(
      new ValidationPipe({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    ingredientDto: CreateIngredientDto,
  ) {
    return this.service.createIngredient(ingredientDto);
  }

  @Get()
  public get(@Query('name') name: string) {
    return this.service.getIngredients(name);
  }

  @Put(':id')
  public update(
    @Param('id') ingredientId: string,
    @Body(
      new ValidationPipe({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    ingredientDto: CreateIngredientDto,
  ) {
    return this.service.updateIngredient(+ingredientId, ingredientDto);
  }

  @Delete(':id')
  public delete(@Param('id') ingredientId: string) {
    return this.service.deleteIngredient(+ingredientId);
  }
}
