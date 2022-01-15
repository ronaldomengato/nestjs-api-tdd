import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { IngredientRepository } from './ingredient.repository';
import { IngredientService } from './ingredient.service';

describe('IngredientService', () => {
  let service: IngredientService;
  let repository: IngredientRepository;
  let mockData;
  let mockedList: any;
  let mockedSearchedList: any;

  const mockIngredientRepositoy = () => ({
    createIngredient: jest.fn(),
    getIngredients: jest.fn(),
    find: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IngredientService,
        {
          provide: IngredientRepository,
          useFactory: mockIngredientRepositoy,
        },
      ],
    }).compile();

    service = module.get<IngredientService>(IngredientService);
    repository = module.get<IngredientRepository>(IngredientRepository);
    mockData = { name: 'Sugar', measureUnit: 'kg', price: 5.5 };
    mockedList = [
      { id: 1, name: 'Sugar', measureUnit: 'kg', price: 5.5 },
      { id: 2, name: 'Flour', measureUnit: 'kg', price: 5.5 },
    ];
    mockedSearchedList = [
      { id: 1, name: 'Sugar', measureUnit: 'kg', price: 5.5 },
    ];
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createIngredient', () => {
    it('should save a ingredient', async () => {
      (repository.createIngredient as jest.Mock).mockReturnValue(mockData);
      expect(await service.createIngredient(mockData)).toEqual(mockData);
    });

    it('should fail due invalid parameter', async () => {
      (repository.createIngredient as jest.Mock).mockRejectedValue(
        new InternalServerErrorException(),
      );
      mockData.measureUnit = 'INVALID';
      await expect(service.createIngredient(mockData)).rejects.toThrow(
        new InternalServerErrorException(),
      );
    });
  });

  describe('getIngredients', () => {
    it('should return not found', async () => {
      (repository.getIngredients as jest.Mock).mockResolvedValueOnce(undefined);
      await expect(service.getIngredients('sugar')).rejects.toThrow(
        new NotFoundException(),
      );
    });
    it('should return a list of ingredients', async () => {
      (repository.getIngredients as jest.Mock).mockResolvedValueOnce(
        mockedSearchedList,
      );
      expect(await service.getIngredients('sugar')).toEqual(mockedSearchedList);
    });
    it('should return all ingredients', async () => {
      (repository.find as jest.Mock).mockResolvedValueOnce(mockedList);
      expect(await service.getIngredients()).toEqual(mockedList);
    });
  });
});
