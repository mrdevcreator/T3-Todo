//import React, { useState } from "react";
import TodoTable from "~/components/TodoTable";
import TodoFrom from "~/components/TodoFrom";
import { useSession } from "next-auth/react";
import ProtectedRoute from "~/utils/ProtectedRoute";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { api } from "~/utils/api";

const TodoPage: React.FC = () => {
  const { data: todo = [] } = api.newTodo.all.useQuery();
  console.log(todo);
  const { data: session } = useSession();

  return (
    <div className="flex h-screen  justify-center bg-gradient-to-b from-[#1111] to-[#15162c]">
      {session && (
        <div className="mx-auto mt-20 flex flex-col items-center gap-8 text-center ">
          <h1 className="text-2xl font-bold text-blue-600">
            Personal Todo List
            <span className="blinking-star text-bold text-3xl"></span>
          </h1>
          <div>
            <TodoFrom />
          </div>
          {todo.length !== 0 ? (
            <div className="container mx-auto">
              <TodoTable todos={todo} />
            </div>
          ) : (
            <p className="mx-auto mt-20 text-center text-2xl text-white">
              Unlock your productivity and conquer your day with a personalized,
              power-packed todo list! Let&#39;s start ...
              <span className="blinking-cursor text-bold text-3xl text-violet-600">
                |
              </span>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProtectedRoute(TodoPage);
