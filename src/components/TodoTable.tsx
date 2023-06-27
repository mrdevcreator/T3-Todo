import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import TodoTableRow from "./TodoTableRow";
import type { Too } from "~/types/Todo";

interface TodoTableProps {
  todos: Too[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TodoTable: React.FC<TodoTableProps> = ({ todos }) => {
  return (
    <TableContainer
      component={Paper}
      className="bg-gradient-to-b from-[#1111] to-[#bdc3c7]"
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Task Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Completed At</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.map((todo, i) => (
            <TodoTableRow key={todo.id} todo={todo} todoIndex={i} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TodoTable;
