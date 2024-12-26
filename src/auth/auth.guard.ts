import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from "@nestjs/graphql";
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	// getRequest(context: ExecutionContext): Request
	// {
	// 	const ctx = GqlExecutionContext.create(context);
	// 	console.log(ctx.getContext().req);
	// 	return ctx.getContext().req;
	// }

	canActivate(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const { req } = ctx.getContext();

        return super.canActivate(
            new ExecutionContextHost([req]),
        );
    }

    // handleRequest(err: any, user: any) {
	// 	console.log("handleRequest", user);
    //     if (err || !user) {
    //         throw err || new Error('GqlAuthGuard');
    //     }
    //     return user;
    // }
}