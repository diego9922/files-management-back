import { join } from 'path';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './file/file.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FolderModule } from './folder/folder.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: process.env.GRAPH_QL_DEBUG == "true",
      playground: process.env.GRAPH_QL_DEBUG == "true",
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    }),
    MongooseModule.forRoot(
      process.env.MONGO_DB_CONNECTION_STRING,
      {
        authSource: "admin"
      }
    ),
    FileModule,
    FolderModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],//services used by controllers for managament data
})
export class AppModule {}
