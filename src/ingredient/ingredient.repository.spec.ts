import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { Ingredient } from './ingredient.entity';
import { IngredientRepository } from './ingredient.repository';

describe('IngredientRepository', () => {
  let repository: IngredientRepository;
  let mockData: CreateIngredientDto;
  let mockSearchList: Ingredient[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IngredientRepository],
    }).compile();

    repository = module.get<IngredientRepository>(IngredientRepository);
    mockData = { name: 'Sugar', measureUnit: 'kg', price: 10.2 } as Ingredient;
    mockSearchList = [
      { name: 'Sugar', measureUnit: 'kg', price: 10.2 },
      { name: 'sugajuice', measureUnit: 'ml', price: 12.2 },
      { name: 'sucralose', measureUnit: 'kg', price: 10.2 },
    ] as Ingredient[];
    repository.save = jest.fn();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('createIngredient', () => {
    it('should be called save with correct params', async () => {
      repository.save = jest.fn().mockReturnValueOnce(mockData);
      await repository.createIngredient(mockData);
      expect(repository.save).toBeCalledWith(mockData);
    });
    it('should be throw when save throw', async () => {
      repository.save = jest.fn().mockRejectedValueOnce(new Error());
      await expect(repository.createIngredient(mockData)).rejects.toThrow();
    });
    it('should be throw if called with invalid params', async () => {
      mockData.measureUnit = 'INVALID';
      await expect(repository.createIngredient(mockData)).rejects.toThrow();
    });
  });

  describe('getIngredients()', () => {
    it('should throw not found exception', async () => {
      repository.find = jest.fn().mockReturnValueOnce(undefined);
      await expect(repository.getIngredients('sugar')).rejects.toThrow(
        new NotFoundException(),
      );
    });
    it('should return a list of ingredients', async () => {
      repository.find = jest.fn().mockReturnValueOnce(mockSearchList);
      expect(await repository.getIngredients('su')).toEqual(mockSearchList);
    });
  });
});
