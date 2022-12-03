import { Injectable ,BadRequestException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ethers } from 'ethers';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from '../entities/users.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { PayloadJwt } from './strategy/interfaces';

@Injectable()
export class AuthService {
  //private provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/avalanche');

  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly jwtService:JwtService
  ) {}

  async create(CreateUserDto: CreateUserDto) {
    try {
      const { sign, hash } = CreateUserDto;

      const address =  ethers.utils.getAddress(ethers.utils.recoverAddress(hash, sign));

      if(!ethers.utils.isAddress(address)){
            throw new BadRequestException()
      }

      const isExist = await this.userRepository.findOneBy({address});

      if (isExist === null) {
        const user = this.userRepository.create({
          address: address,
        });

        await this.userRepository.save(user);

        return this.getJwt({address});
      }

      return this.getJwt({address});

    } catch (error) {
      throw new BadRequestException()
    }
  }

  async getJwt(payloadJwt:PayloadJwt){
    const token= this.jwtService.sign(payloadJwt);
    return token
  } 
}
