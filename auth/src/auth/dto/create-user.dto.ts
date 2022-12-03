import {IsNotEmpty,IsString } from 'class-validator';
export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    sign:string

    @IsNotEmpty()
    @IsString()
    hash:string

}
