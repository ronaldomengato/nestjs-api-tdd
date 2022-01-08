import { Test, TestingModule } from '@nestjs/testing';
import { IngredientRepository } from './ingredient.repository';
import { IngredientService } from './ingredient.service';

describe('IngredientService', () => {
  let service: IngredientService;
  let repository: IngredientRepository;
  let mockData;

  const mockIngredientRepositoy = () => ({
    createIngredient: jest.fn(),
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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createIngredient', () => {
    it('should save a ingredient', async () => {
      (repository.createIngredient as jest.Mock).mockReturnValue(mockData);
      expect(await service.createIngredient(mockData)).toEqual(mockData);
    });
  });
});
