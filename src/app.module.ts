import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IngredientModule } from './ingredient/ingredient.module';

@Module({
  imports: [IngredientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
