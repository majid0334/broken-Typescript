"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/graphql/schema/schema.ts
const graphql_tools_1 = require("graphql-tools");
const taskResolvers_1 = require("../resolvers/taskResolvers");
const typeDefs = `
  type Task {
    id: Int
    title: String
    completed: Boolean
  }

  type Query {
    tasks: [Task]
  }

  type Mutation {
    createTask(title: String!): Task
    updateTask(id: Int!, title: String, completed: Boolean): Task
    deleteTask(id: Int!): Task
    toggleTask(id: Int!): Task
  }
`;
const schema = (0, graphql_tools_1.makeExecutableSchema)({
    typeDefs,
    resolvers: taskResolvers_1.taskResolvers,
});
exports.default = schema;
