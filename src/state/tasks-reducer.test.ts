import { TasksStateType } from "../App";
import {
  AddTaskAC,
  ChangeTaskStatusAC,
  EditTaskTitleAC,
  RemoveTaskAC,
  tasksReducer,
} from "./tasks-reducer";
import { AddTodolistAC, RemoveTodolistAC } from "./todolists-reducer";

test.skip("task should be removed", () => {
  let startState: TasksStateType = {
    ["todolistId1"]: [
      {
        id: "1",
        title: "HTML",
        isDone: true,
      },
      {
        id: "2",
        title: "CSS",
        isDone: true,
      },
      {
        id: "3",
        title: "JS",
        isDone: false,
      },
    ],
    ["todolistId2"]: [
      {
        id: "1",
        title: "HTML",
        isDone: true,
      },
      {
        id: "2",
        title: "CSS",
        isDone: true,
      },
      {
        id: "3",
        title: "JS",
        isDone: false,
      },
    ],
  };

  let action = RemoveTaskAC("todolistId1", "2");

  let endState = tasksReducer(startState, action);

  expect(endState["todolistId1"].length).toBe(2);
});

test.skip("new task should be added", () => {
  let startState: TasksStateType = {
    ["todolistId1"]: [
      {
        id: "1",
        title: "HTML",
        isDone: true,
      },
      {
        id: "2",
        title: "CSS",
        isDone: true,
      },
      {
        id: "3",
        title: "JS",
        isDone: false,
      },
    ],
    ["todolistId2"]: [
      {
        id: "1",
        title: "HTML",
        isDone: true,
      },
      {
        id: "2",
        title: "CSS",
        isDone: true,
      },
      {
        id: "3",
        title: "JS",
        isDone: false,
      },
    ],
  };

  let action = AddTaskAC("todolistId1", "New Title");

  let endState = tasksReducer(startState, action);

  expect(endState["todolistId1"].length).toBe(4);
  expect(endState["todolistId1"][0].title).toBe("New Title");
});

test.skip("task title should be edited", () => {
  let startState: TasksStateType = {
    ["todolistId1"]: [
      {
        id: "1",
        title: "HTML",
        isDone: true,
      },
      {
        id: "2",
        title: "CSS",
        isDone: true,
      },
      {
        id: "3",
        title: "JS",
        isDone: false,
      },
    ],
    ["todolistId2"]: [
      {
        id: "1",
        title: "HTML",
        isDone: true,
      },
      {
        id: "2",
        title: "CSS",
        isDone: true,
      },
      {
        id: "3",
        title: "JS",
        isDone: false,
      },
    ],
  };

  let action = EditTaskTitleAC("todolistId1", "2", "New Title");

  let endState = tasksReducer(startState, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId1"][1].title).toBe("New Title");
});

test.skip("task status should be changed", () => {
  let startState: TasksStateType = {
    ["todolistId1"]: [
      {
        id: "1",
        title: "HTML",
        isDone: true,
      },
      {
        id: "2",
        title: "CSS",
        isDone: true,
      },
      {
        id: "3",
        title: "JS",
        isDone: false,
      },
    ],
    ["todolistId2"]: [
      {
        id: "1",
        title: "HTML",
        isDone: true,
      },
      {
        id: "2",
        title: "CSS",
        isDone: true,
      },
      {
        id: "3",
        title: "JS",
        isDone: false,
      },
    ],
  };

  let action = ChangeTaskStatusAC("todolistId1", "2", false);

  let endState = tasksReducer(startState, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId1"][1].isDone).toBe(false);
});

test.skip("new property with new array should be added when new todolist is added", () => {
  let startState: TasksStateType = {
    ["todolistId1"]: [
      {
        id: "1",
        title: "HTML",
        isDone: true,
      },
      {
        id: "2",
        title: "CSS",
        isDone: true,
      },
      {
        id: "3",
        title: "JS",
        isDone: false,
      },
    ],
    ["todolistId2"]: [
      {
        id: "1",
        title: "HTML",
        isDone: true,
      },
      {
        id: "2",
        title: "CSS",
        isDone: true,
      },
      {
        id: "3",
        title: "JS",
        isDone: false,
      },
    ],
  };

  let action = AddTodolistAC("New Todolist Title");

  let endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k != "todolistId1" && k != "todolistId2");

  if (!newKey) {
    throw Error("New Key should be added");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test("property with todolistId should be deleted", () => {
  let startState: TasksStateType = {
    ["todolistId1"]: [
      {
        id: "1",
        title: "HTML",
        isDone: true,
      },
      {
        id: "2",
        title: "CSS",
        isDone: true,
      },
      {
        id: "3",
        title: "JS",
        isDone: false,
      },
    ],
    ["todolistId2"]: [
      {
        id: "1",
        title: "HTML",
        isDone: true,
      },
      {
        id: "2",
        title: "CSS",
        isDone: true,
      },
      {
        id: "3",
        title: "JS",
        isDone: false,
      },
    ],
  };

  let action = RemoveTodolistAC("todolistId1");
  let endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId1"]).toBeUndefined();
});
