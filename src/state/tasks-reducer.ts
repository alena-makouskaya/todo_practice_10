import { v1 } from "uuid";
import { FilterValueType, TasksStateType } from "../App";
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer";

export type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  todolistId: string;
  taskId: string;
};

export type AddTaskActionType = {
  type: "ADD-TASK";
  todolistId: string;
  title: string;
};

export type EditTaskTitleActionType = {
  type: "EDIT-TASK-TITLE";
  todolistId: string;
  taskId: string;
  title: string;
};

export type ChangeTaskStatusActionType = {
  type: "CHANGE-TASK-STATUS";
  todolistId: string;
  taskId: string;
  isDone: boolean;
};

type ActionType =
  | RemoveTaskActionType
  | AddTaskActionType
  | EditTaskTitleActionType
  | ChangeTaskStatusActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  ;

export const tasksReducer = (state: TasksStateType, action: ActionType) => {
  switch (action.type) {
    case "REMOVE-TASK": {
      let todolist = state[action.todolistId];

      let tasks = todolist.filter((t) => t.id != action.taskId);
      state[action.todolistId] = tasks;

      return {
        ...state,
      };
    }

    case "ADD-TASK": {
      let todolist = state[action.todolistId];

      let tasks = [
        {
          id: v1(),
          title: action.title,
          isDone: false,
        },
        ...todolist,
      ];

      state[action.todolistId] = tasks;

      return {
        ...state,
      };
    }

    case "EDIT-TASK-TITLE": {
      let todolist = state[action.todolistId];

      let task = todolist.find((t) => t.id === action.taskId);

      if (task) {
        task.title = action.title;
      }

      return {
        ...state,
      };
    }

    case "CHANGE-TASK-STATUS": {
      let todolist = state[action.todolistId];

      let task = todolist.find((t) => t.id === action.taskId);

      if (task) {
        task.isDone = action.isDone;
      }

      return {
        ...state,
      };
    }

    case "ADD-TODOLIST": {
      const stateCopy = { ...state };

      stateCopy[action.todolistId] = [];

      return stateCopy;
    }

    case "REMOVE-TODOLIST": {
        const stateCopy = {...state}
        delete stateCopy[action.todolistId]
        return stateCopy
    }

    default:
      return state;
  }
};

export const RemoveTaskAC = (
  todolistId: string,
  taskId: string
): RemoveTaskActionType => {
  return {
    type: "REMOVE-TASK",
    todolistId,
    taskId,
  };
};

export const AddTaskAC = (
  todolistId: string,
  title: string
): AddTaskActionType => {
  return {
    type: "ADD-TASK",
    todolistId,
    title,
  };
};

export const EditTaskTitleAC = (
  todolistId: string,
  taskId: string,
  title: string
): EditTaskTitleActionType => {
  return {
    type: "EDIT-TASK-TITLE",
    todolistId,
    taskId,
    title,
  };
};

export const ChangeTaskStatusAC = (
  todolistId: string,
  taskId: string,
  isDone: boolean
): ChangeTaskStatusActionType => {
  return {
    type: "CHANGE-TASK-STATUS",
    todolistId,
    taskId,
    isDone,
  };
};
