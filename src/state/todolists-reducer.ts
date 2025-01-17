import { type } from "os";
import { FilterValueType, TodolistProps } from "../App";
import { v1 } from "uuid";

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  todolistId: string;
};

export type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  title: string;
  todolistId: string
};

export type EditTodolistTitleActionType = {
  type: "EDIT-TODOLIST-TITLE";
  todolistId: string;
  title: string;
};

export type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  todolistId: string;
  filter: FilterValueType;
};

type ActionType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | EditTodolistTitleActionType
  | ChangeTodolistFilterActionType;

export const todolistsReducer = (
  state: Array<TodolistProps>,
  action: ActionType
) => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id != action.todolistId);
    }

    case "ADD-TODOLIST": {
      return [
        {
          id: action.todolistId,
          title: action.title,
          filter: "all",
        },
        ...state,
      ];
    }

    case "EDIT-TODOLIST-TITLE": {
      let todolist = state.find((tl) => tl.id === action.todolistId);

      if (todolist) {
        todolist.title = action.title;
      }

      return [...state];
    }

    case "CHANGE-TODOLIST-FILTER": {
        let todolist = state.find((tl) => tl.id === action.todolistId);

        if (todolist) {
          todolist.filter = action.filter;
        }
  
        return [...state];

    }

    default:
      return state;
  }
};

export const RemoveTodolistAC = (
  todolistId: string
): RemoveTodolistActionType => {
  return { type: "REMOVE-TODOLIST", todolistId };
};

export const AddTodolistAC = (title: string): AddTodolistActionType => {
  return { type: "ADD-TODOLIST", title, todolistId: v1() };
};

export const EditTodolistTitleAC = (
  todolistId: string,
  title: string
): EditTodolistTitleActionType => {
  return { type: "EDIT-TODOLIST-TITLE", todolistId, title };
};

export const ChangeTodolistFilterAC = (
  todolistId: string,
  filter: FilterValueType
): ChangeTodolistFilterActionType => {
  return { type: "CHANGE-TODOLIST-FILTER", todolistId, filter };
};
