"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = exports.taskResolvers = void 0;
// src/graphql/resolvers/taskResolvers.ts
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.prisma = prisma;
const taskResolvers = {
    Query: {
        tasks: () => __awaiter(void 0, void 0, void 0, function* () {
            return prisma.task.findMany();
        }),
    },
    Mutation: {
        createTask: ({ title }) => __awaiter(void 0, void 0, void 0, function* () {
            return prisma.task.create({
                data: {
                    title,
                    completed: false,
                },
            });
        }),
        updateTask: ({ id, title, completed, }) => __awaiter(void 0, void 0, void 0, function* () {
            return prisma.task.update({
                where: { id },
                data: {
                    title,
                    completed,
                },
            });
        }),
        deleteTask: ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
            return prisma.task.delete({
                where: { id },
            });
        }),
        toggleTask: ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
            const task = yield prisma.task.findUnique({
                where: { id },
            });
            if (!task) {
                throw new Error(`Task with ID ${id} not found`);
            }
            return prisma.task.update({
                where: { id },
                data: { completed: !task.completed },
            });
        }),
    },
};
exports.taskResolvers = taskResolvers;
