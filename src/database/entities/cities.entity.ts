import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CarsEntity } from './cars.entity';
import { TableNameEnum } from './enum/table-name.enum';

@Entity(TableNameEnum.CITIES)
export class CitiesEntity {
  @PrimaryGeneratedColumn('uuid')
  city_id: string;

  @Column('text')
  city: string;

  @OneToMany(() => CarsEntity, (entity) => entity.city)
  cars?: CarsEntity;
}
