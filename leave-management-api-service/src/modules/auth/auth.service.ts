import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';
import { LoginDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.email === email) { // You should hash and compare the password instead
      return user;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    // Extract roles from the user object
    const roles = user.userRoles.map(userRole => userRole.role.name);
    
    // Create payload with user id, name, and roles
    const payload = { sub: user.id, name: user.name, roles: roles };

    // Generate JWT token
    const token = this.jwtService.sign(payload);


    console.log(token)
    // Return token to client
    return { access_token: token };
  }
}
