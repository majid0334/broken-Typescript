// src/server.ts
import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import schema from "./graphql/schema/schema"
import { prisma } from "./graphql/resolvers/taskResolvers";

const app = express();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP((req) => ({
    schema,
    graphiql: true,
    context: { prisma: prisma },
  }))
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`);
});
