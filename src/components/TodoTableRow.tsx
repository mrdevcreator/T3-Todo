import { useState } from "react";
import {
  TableCell,
  TableRow,
  TextField,
  Checkbox,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { api } from "~/utils/api";
import { type Too, Priority } from "~/types/Todo";

interface TodoTableRowProps {
  todo: Too;
  todoIndex: number;
}

const TodoTableRow: React.FC<TodoTableRowProps> = ({ todo, todoIndex }) => {
  const trpc = api.useContext();
  const { mutateAsync: mutateasync1 } = api.newTodo.toggle.useMutation({
    onSettled: async () => {
      await trpc.newTodo.all.invalidate();
    },
  });
  const handleCheckboxOnChange = () => {
    const updatedTodo = {
      ...todo,
      done: !todo.done,
    };
    const { id, done } = updatedTodo;
    if (done) {
      const completedAt = new Date().toISOString();
      void mutateasync1({ id, done, completedAt });
    } else {
      const completedAt = "Not Done Yet!";
      void mutateasync1({ id, done, completedAt });
    }
  };

  const { mutateAsync: mutateasync3 } = api.newTodo.priority.useMutation({
    onSettled: async () => {
      await trpc.newTodo.all.invalidate();
    },
  });
  const handlePriorityChange = (id: string, value: Priority) => {
    void mutateasync3({ id: id, priority: value });
  };

  const { mutateAsync: mutateasync2 } = api.newTodo.delete.useMutation({
    onSettled: async () => {
      await trpc.newTodo.all.invalidate();
    },
  });

  const handleDeleteOnClick = () => {
    void mutateasync2(todo.id);
  };

  const formatDate = (date: Date | null) => {
    if (date) {
      return date.toISOString();
    }
    return "-";
  };

  const [editedTaskName, setEditedTaskName] = useState(todo.taskname);
  const [editedDueDate, setEditedDueDate] = useState(todo.dueDate);
  const [isEditing, setIsEditing] = useState(false);
  const [isTouched, setIsTouched] = useState(true);

  const handleEditOnClick = () => {
    setIsEditing(true);
  };
  const { mutateAsync: mutateasync4 } = api.newTodo.update.useMutation({
    onSettled: async () => {
      await trpc.newTodo.all.invalidate();
    },
  });
  const handleSaveOnClick = () => {
    const updatedTodo = {
      ...todo,
      taskname: editedTaskName,
      dueDate: editedDueDate,
    };
    void mutateasync4({
      id: updatedTodo.id,
      taskname: updatedTodo.taskname,
      dueDate: updatedTodo.dueDate,
    });
    setIsTouched(true);
    setIsEditing(false);
    setEditedTaskName(todo.taskname);
    setEditedDueDate(todo.dueDate);
  };

  const handleCancelOnClick = () => {
    setIsTouched(true);
    setIsEditing(false);
    setEditedTaskName(todo.taskname);
    setEditedDueDate(todo.dueDate);
  };
  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTouched(false);
    setEditedTaskName(e.target.value);
  };

  const handleDueInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTouched(false);
    setEditedDueDate(new Date(e.target.value));
  };

  return (
    <TableRow key={todoIndex}>
      <TableCell>{todoIndex + 1}</TableCell>
      <TableCell>
        {isEditing ? (
          <TextField value={editedTaskName} onChange={handleTextInput} />
        ) : todo.done ? (
          <span className="relative text-black line-through">
            {todo.taskname}
            <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 transform bg-red-500"></span>
          </span>
        ) : (
          todo.taskname
        )}
      </TableCell>
      <TableCell>
        <Checkbox checked={todo.done} onChange={handleCheckboxOnChange} />
      </TableCell>
      <TableCell className="w-40">
        {formatDate(todo.createdAt).split("T")[0]}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <TextField
            type="date"
            value={editedDueDate}
            onChange={handleDueInput}
          />
        ) : (
          formatDate(todo.dueDate).split("T")[0]
        )}
      </TableCell>
      <TableCell className="w-40">
        <Select
          value={todo.priority}
          className="w-full"
          onChange={(event) => {
            handlePriorityChange(todo.id, event.target.value as Priority);
          }}
        >
          <MenuItem value={Priority.HIGH}>High</MenuItem>
          <MenuItem value={Priority.MEDIUM}>Medium</MenuItem>
          <MenuItem value={Priority.LOW}>Low</MenuItem>
        </Select>
      </TableCell>
      <TableCell className="w-40 ">{todo.completedAt?.split("T")[0]}</TableCell>
      <TableCell className="px-auto w-40">
        {isEditing ? (
          <IconButton color="error" onClick={handleCancelOnClick}>
            <CancelIcon />
          </IconButton>
        ) : (
          <IconButton
            color="primary"
            onClick={handleEditOnClick}
            disabled={isEditing}
          >
            <EditIcon />
          </IconButton>
        )}
        <IconButton color="error" onClick={handleDeleteOnClick}>
          <DeleteIcon />
        </IconButton>
        {isEditing && (
          <IconButton
            color="success"
            onClick={handleSaveOnClick}
            disabled={isTouched}
          >
            <SaveIcon />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
};

export default TodoTableRow;
