import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import * as dotenv from "dotenv";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { Container } from "typedi";

import { formatError } from "../../shared/exception/format.execption";
import { logginPlugin } from "../../shared/plugins/logging.plugin";
import { MongoConf } from "../conf/data/mongo/mongo.conf";
import { resolvers } from '../resolvers/index.resolver';

dotenv.config();
const PORT = process.env.PORT || 4000;

(async () => {
  const UrlMongo = process.env.URL_MONGO;

  if (!UrlMongo) {
    console.error("Erro: A variável de ambiente MONGO_URI não está definida.");
    process.exit(1);
  }

  console.log("Tentando conectar ao MongoDB com a URI:", UrlMongo);

  const mongoConf = Container.get(MongoConf);

  try {
    await mongoConf.connect(UrlMongo);
    console.log("Aplicação conectada ao MongoDB!");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    process.exit(1);
  }
})();

async function bootstrap() {
  const schema = await buildSchema({
    container: Container,
    resolvers: resolvers as any,
    emitSchemaFile: true,
  });
  const server = new ApolloServer({
    schema,
    formatError,
    plugins:[logginPlugin]
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(PORT) },
  });
  console.log(`GraphQL server ready at ${url}`);
}

bootstrap();
