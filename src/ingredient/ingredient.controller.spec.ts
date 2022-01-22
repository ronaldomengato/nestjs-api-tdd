import { Test, TestingModule } from '@nestjs/testing';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';
jest.mock('./ingredient.service');

describe('IngredientController', () => {
  let controller: IngredientController;
  let service: IngredientService;
  let mockData = { name: 'Sugar', measureUnit: 'kg', price: 5.5 };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngredientController],
      providers: [IngredientService],
    }).compile();

    controller = module.get<IngredientController>(IngredientController);
    service = module.get<IngredientService>(IngredientService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the service', () => {
    const ingredientDto: CreateIngredientDto = {
      name: '',
      measureUnit: '',
      price: 0,
    };
    controller.save(ingredientDto);
    expect(service.createIngredient).toHaveBeenCalled();
  });

  describe('/ GET', () => {
    it('should call the service for getIngredients', () => {
      controller.get('');
      expect(service.getIngredients).toHaveBeenCalled();
    });
  });

  describe('/{id} PUT', () => {
    it('should call the service for updateIngredient', () => {
      controller.update('1', mockData);
      expect(service.updateIngredient).toHaveBeenCalled();
    });
  });
});
