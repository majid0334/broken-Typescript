// src/graphql/resolvers/taskResolvers.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const taskResolvers = {
  Query: {
    tasks: async (): Promise<any[]> => {
      return prisma.task.findMany();
    },
  },
  Mutation: {
    createTask: async ({ title }: { title: string }): Promise<any> => {
      return prisma.task.create({
        data: {
          title,
          completed: false,
        },
      });
    },
    updateTask: async ({
      id,
      title,
      completed,
    }: {
      id: number;
      title?: string;
      completed?: boolean;
    }): Promise<any> => {
      return prisma.task.update({
        where: { id },
        data: {
          title,
          completed,
        },
      });
    },
    deleteTask: async ({ id }: { id: number }): Promise<any> => {
      return prisma.task.delete({
        where: { id },
      });
    },
    toggleTask: async ({ id }: { id: number }): Promise<any> => {
      const task = await prisma.task.findUnique({
        where: { id },
      });

      if (!task) {
        throw new Error(`Task with ID ${id} not found`);
      }

      return prisma.task.update({
        where: { id },
        data: { completed: !task.completed },
      });
    },
  },
};

export { taskResolvers, prisma };
