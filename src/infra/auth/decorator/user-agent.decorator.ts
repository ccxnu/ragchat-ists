import { createParamDecorator, ExecutionContext } from "@nestjs/common";

import { REQUEST_USER_AGENT } from "../constants";

export const UserAgent = createParamDecorator((_data: unknown, ctx: ExecutionContext) =>
{
    const request = ctx.switchToHttp().getRequest();
    const agent: string | undefined = request.headers[REQUEST_USER_AGENT];
    return agent;
});
