import { ChangeEvent, useState } from "react";
import { FilterValueType } from "../App";
import { EditableSpan } from "./EditableSpan";
import { AddItemForm } from "./AddItemForm";

export type TasksPropsType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TodolistPropsType = {
  id: string;
  title: string;
  tasks: TasksPropsType[];
  filter: FilterValueType;

  removeTask: (todolistId: string, taskId: string) => void;
  changeStatus: (todolistId: string, taskId: string, value: boolean) => void;
  addTask: (todolistId: string, title: string) => void;
  changeFilter: (todolistId: string, value: FilterValueType) => void;
  editTaskTitle: (todolistId: string, taskId: string, title: string) => void;

  editTodolistTitle: (todolistId: string, title: string) => void;
};

export function Todolist(props: TodolistPropsType) {
  let {
    id,
    tasks,
    title,
    removeTask,
    changeStatus,
    addTask,
    changeFilter,
    filter,
    editTaskTitle,
    editTodolistTitle,
  } = props;

  const removeTaskHandler = (taskId: string) => {
    removeTask(id, taskId);
  };

  const changeStatusHandler = (taskId: string, value: boolean) => {
    changeStatus(id, taskId, value);
  };

  const addTaskHandler = (title: string) => {
    addTask(id, title);
  };

  const changeFilterAll = () => {
    changeFilter(id, "all");
  };

  const changeFilterActive = () => {
    changeFilter(id, "active");
  };

  const changeFilterCompleted = () => {
    changeFilter(id, "completed");
  };

  const editTaskTitleHandler = (taskId: string, title: string) => {
    editTaskTitle(id, taskId, title);
  };

  const editTodolistTitleHandler = (title: string) => {
    editTodolistTitle(id, title);
  };

  return (
    <div className="tdl-card">
      <h3>
        <EditableSpan
          title={title}
          callBack={(title: string) => editTodolistTitleHandler(title)}
        />
      </h3>

      <AddItemForm callBack={(title: string) => addTaskHandler(title)} />

      <ul>
        {tasks.map((t) => {
          return (
            <li key={t.id}>
              <input
                type="checkbox"
                checked={t.isDone}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  changeStatusHandler(t.id, e.currentTarget.checked)
                }
              />
              {/* <span>{t.title}</span> */}
              <EditableSpan
                title={t.title}
                callBack={(title: string) => editTaskTitleHandler(t.id, title)}
              />
              <button onClick={() => removeTaskHandler(t.id)}> x </button>
            </li>
          );
        })}
      </ul>

      <div>
        <button
          onClick={changeFilterAll}
          className={filter === "all" ? "isActive" : ""}
        >
          All
        </button>
        <button
          onClick={changeFilterActive}
          className={filter === "active" ? "isActive" : ""}
        >
          Active
        </button>
        <button
          onClick={changeFilterCompleted}
          className={filter === "completed" ? "isActive" : ""}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
