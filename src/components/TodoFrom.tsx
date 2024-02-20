import React, { useState } from "react";
import { TextField, Button, Select, MenuItem } from "@mui/material";
import { Priority } from "~/types/Todo";
import { api } from "~/utils/api";

const TodoForm: React.FC = () => {
  const [dueDateFocused, setDueDateFocused] = useState(false);
  const [taskname, setTaskname] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<Priority>(Priority.LOW);
  const trpc = api.useContext();
  const { mutateAsync } = api.newTodo.create.useMutation({
    onSuccess() {
      void trpc.newTodo.all.invalidate();
    },
    onSettled: async () => {
      await trpc.newTodo.all.invalidate();
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTodo = {
      taskname,
      dueDate,
      priority,
    };
    void mutateAsync({
      taskname,
      dueDate: newTodo.dueDate,
      priority,
    });
    setTaskname("");
    setDueDate("");
    setPriority(Priority.LOW);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-row gap-4">
      <div>
        <TextField
          label="Task Name"
          value={taskname}
          onChange={(event) => setTaskname(event.target.value)}
          required
        />
      </div>
      <div className="">
        <TextField
          className="w-40"
          type={dueDateFocused ? "date" : "text"}
          label="Due Date"
          placeholder="Enter due date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
          onFocus={() => setDueDateFocused(true)}
          onBlur={() => setDueDateFocused(false)}
          required
        />
      </div>
      <div>
        <Select
          className="w-40"
          value={priority}
          onChange={(event) => setPriority(event.target.value as Priority)}
          required
        >
          <MenuItem value={Priority.HIGH}>High</MenuItem>
          <MenuItem value={Priority.MEDIUM}>Medium</MenuItem>
          <MenuItem value={Priority.LOW}>Low</MenuItem>
        </Select>
      </div>
      <div className="flex items-center justify-center">
        <Button type="submit" variant="contained" color="primary">
          Add Todo
        </Button>
      </div>
    </form>
  );
};

export default TodoForm;
