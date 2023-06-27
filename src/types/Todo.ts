import type { inferRouterOutputs } from "@trpc/server";
import { type AppRouter } from "~/server/api/root";

type RouterOutputs = inferRouterOutputs<AppRouter>;
type allTodosOutput = RouterOutputs["newTodo"]["all"];
export type Too = allTodosOutput[number];

export interface Todo {
  id: string;
  done: boolean;
  taskname: string;
  createdAt: Date | null;
  dueDate: Date | null;
  completedAt: Date | null;
  priority: Priority | null;
}

export enum Priority {
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
}
