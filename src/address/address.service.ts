import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityService } from 'src/city/city.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressEntity } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    private readonly userService: UserService,
    private readonly cityService: CityService,
  ) {}
  async createAddress(
    createAddressDto: CreateAddressDto,
    userId: number,
  ): Promise<AddressEntity> {
    await this.userService.findUserById(userId); // funcão para verificar se o usuario ja existe
    await this.cityService.findCityById(createAddressDto.cityId); // verifica se a cidade ja existe
    return this.addressRepository.save({
      ...createAddressDto,
      userId,
    });
  }
}
