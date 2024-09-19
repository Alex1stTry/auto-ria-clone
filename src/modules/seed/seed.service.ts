import { Injectable } from '@nestjs/common';

import { carBrandsSeed } from '../../../car-brands.seed';
import { BrandRepository } from '../repository/services/brand.repository';
import { ModelRepository } from '../repository/services/model.repository';

@Injectable()
export class SeedService {
  constructor(
    private readonly brandRepo: BrandRepository,
    private readonly modelRepo: ModelRepository,
  ) {}

  public async seedDatabase(): Promise<void> {
    for (const carBrand of carBrandsSeed) {
      let brand = await this.brandRepo.findOne({
        where: { name: carBrand.brand },
      });

      if (!brand) {
        brand = await this.brandRepo.save({
          name: carBrand.brand,
        });

        for (const modelName of carBrand.models) {
          const modelExists = await this.modelRepo.findOne({
            where: { name: modelName, brand: { id: brand.id } },
          });
          if (!modelExists) {
            await this.modelRepo.save({
              name: modelName,
              brand: { id: brand.id },
            });
          }
        }
      }
    }
  }
}
