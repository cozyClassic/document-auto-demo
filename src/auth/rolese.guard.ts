import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true; // role 제한이 없는 API면 통과
    }

    const { user } = context.switchToHttp().getRequest();
    console.log(requiredRoles);
    console.log(user);
    return requiredRoles.includes(user.role); // user.role이 하나라도 맞으면 통과
  }
}
