import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { IngredientModule } from '../src/ingredient/ingredient.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { Ingredient } from '../src/ingredient/ingredient.entity';

describe('IngredientController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        IngredientModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'modavest',
          password: 'modavest',
          database: 'recipes',
          // entities: [join(__dirname, '**', '*.entity.{ts,js}')],
          entities: [Ingredient],
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/ (POST)', () => {
    it('should return 422 status code', () => {
      const body = {
        name: 'sugar',
        measureUnit: 'INVALID',
      };
      return request(app.getHttpServer())
        .post('/ingredients')
        .send(body)
        .expect(422);
    });
    it('should create a new ingredient', () => {
      const body = {
        name: 'flour',
        measureUnit: 'kg',
        price: 20.55,
      };
      return request(app.getHttpServer())
        .post('/ingredients')
        .send(body)
        .expect(201);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
