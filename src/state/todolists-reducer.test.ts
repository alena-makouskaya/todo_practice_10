import { TodolistProps } from "../App";
import {
  AddTodolistAC,
  ChangeTodolistFilterAC,
  EditTodolistTitleAC,
  RemoveTodolistAC,
  todolistsReducer,
} from "./todolists-reducer";

test.skip("tdlist should be removed", () => {
  let startState: Array<TodolistProps> = [
    {
      id: "todolistId1",
      title: "What to learn?",
      filter: "all",
    },
    {
      id: "todolistId2",
      title: "What to read?",
      filter: "all",
    },
  ];

  let action = RemoveTodolistAC("todolistId1");

  let endState = todolistsReducer(startState, action);

  expect(endState.length).toBe(1);
});

test.skip("tdlist should be added", () => {
  let startState: Array<TodolistProps> = [
    {
      id: "todolistId1",
      title: "What to learn?",
      filter: "all",
    },
    {
      id: "todolistId2",
      title: "What to read?",
      filter: "all",
    },
  ];

  let newTitle = "New Title";

  let action = AddTodolistAC(newTitle);

  let endState = todolistsReducer(startState, action);

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe("New Title");
});

test.skip("tdlist should be edited", () => {
  let startState: Array<TodolistProps> = [
    {
      id: "todolistId1",
      title: "What to learn?",
      filter: "all",
    },
    {
      id: "todolistId2",
      title: "What to read?",
      filter: "all",
    },
  ];

  let newTitle = "New Title";

  let action = EditTodolistTitleAC("todolistId1", newTitle);

  let endState = todolistsReducer(startState, action);

  expect(endState.length).toBe(2);
  expect(endState[0].title).toBe("New Title");
});

test.skip("tdlist filter should be changed", () => {
  let startState: Array<TodolistProps> = [
    {
      id: "todolistId1",
      title: "What to learn?",
      filter: "all",
    },
    {
      id: "todolistId2",
      title: "What to read?",
      filter: "all",
    },
  ];

  let action = ChangeTodolistFilterAC("todolistId1", "active");

  let endState = todolistsReducer(startState, action);

  expect(endState.length).toBe(2);
  expect(endState[0].filter).toBe("active");
});
