import {PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt";
import { Users } from '../../entities/users.entity';
import { PayloadJwt } from "./interfaces";
import {Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends  PassportStrategy(Strategy){

    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,
        configService: ConfigService
    ) {
        super({
            secretOrKey:"1234556",
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }


    async validate(payload:PayloadJwt):Promise<Users>{
        const {address}=payload;
        const user = await this.userRepository.findOneBy({address});

        if (!user) {
            throw new UnauthorizedException();
        }

        if(!user.isActive){
            throw new UnauthorizedException();
        }

        return user;
    }

}

