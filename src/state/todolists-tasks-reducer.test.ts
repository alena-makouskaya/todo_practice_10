import { TasksStateType, TodolistProps } from "../App"
import { tasksReducer } from "./tasks-reducer";
import { AddTodolistAC, todolistsReducer } from "./todolists-reducer";

test.skip("ids should be equals", () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistProps> = [];

    let action = AddTodolistAC("New title");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodolists).toBe(action.todolistId)
})