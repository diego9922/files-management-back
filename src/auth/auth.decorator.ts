import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from "@nestjs/graphql";

export const LogedUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const gqlCtx = GqlExecutionContext.create(ctx);
        const request = gqlCtx.getContext().req;
        
        //user optained from JwtStrategy.validate
        return request.user;
    },
);