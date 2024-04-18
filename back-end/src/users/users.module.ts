import { Module } from "@nestjs/common";

import { User, UserSchema } from "../schemas/User.shema";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersServices } from "./users.service";
import { UsersController } from "./users.controller";


@Module({
    imports: [
        MongooseModule.forFeature([ {
            name: User.name,
            schema: UserSchema,
        }
    ])
    ],
    providers : [UsersServices],
    controllers : [ UsersController],
    exports: [UsersModule]
})

export class UsersModule {

}