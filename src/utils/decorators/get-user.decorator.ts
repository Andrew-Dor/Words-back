import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { User } from "src/auth/user.entity";

export const GetUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext):User => {
        const gqlCtx = GqlExecutionContext.create(ctx);
        const request = gqlCtx.getContext().req;
        return request.user;
    },
);