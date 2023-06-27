import { z } from "zod";
import {
  createTRPCRouter,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
//import { Priority } from "@prisma/client";

export const todoRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const todos = await ctx.prisma.todo.findMany({
      where: {
        userId: ctx.session?.user.id,
      },
    });
    return todos;
  }),

  create: protectedProcedure
    .input(
      z.object({
        taskname: z.string(),
        dueDate: z.string(),
        priority: z.enum(["HIGH", "MEDIUM", "LOW"]).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const newTodo = await ctx.prisma.todo.create({
        data: {
          taskname: input.taskname,
          dueDate: new Date(input.dueDate),
          priority: input.priority,
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
      console.log(ctx.session.user.id);
      return newTodo;
    }),
  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.todo.delete({
      where: {
        id: input,
      },
    });
  }),
  priority: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        priority: z.enum(["HIGH", "MEDIUM", "LOW"]).default("LOW"),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.todo.update({
        where: {
          id: input.id,
        },
        data: {
          priority: input.priority,
        },
      });
    }),

  toggle: protectedProcedure
    .input(
      z.object({ id: z.string(), done: z.boolean(), completedAt: z.string() })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.todo.update({
        where: {
          id: input.id,
        },
        data: {
          done: input.done,
          completedAt: input.completedAt,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        taskname: z.string().optional(),
        dueDate: z.date().nullable().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.todo.update({
        where: {
          id: input.id,
        },
        data: {
          taskname: input.taskname,
          dueDate: input.dueDate,
        },
      });
    }),
});
