import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

import { IActiveUser } from "@/core/repositories/active-user-data";
import { UserRoles } from "@/core/repositories/roles";

import { REQUEST_USER_KEY } from "../constants";
import { ROLES_KEY } from "../decorator/user-roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate
{
  constructor(private readonly reflector: Reflector)
  {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>
  {
    const contextRoles = this.reflector.getAllAndOverride<UserRoles[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!contextRoles) return true;

    const user: IActiveUser = context.switchToHttp().getRequest()[REQUEST_USER_KEY];

    return contextRoles.some((role) => user.role === role);
  }
}
