import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { TasksPropsType, Todolist, TodolistPropsType } from "./components/Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./components/AddItemForm";

export type FilterValueType = "all" | "active" | "completed";

export type TodolistProps = {
  id: string;
  title: string;
  filter: FilterValueType;
};

export type TasksStateType = {
  [key: string]: Array<TasksPropsType>
}

function App() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<TodolistProps[]>([
    {
      id: todolistId1,
      title: "What to learn?",
      filter: "all",
    },
    {
      id: todolistId2,
      title: "What to read?",
      filter: "all",
    },
  ]);

  let [tasks, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
      {
        id: v1(),
        title: "HTML",
        isDone: true,
      },
      {
        id: v1(),
        title: "CSS",
        isDone: true,
      },
      {
        id: v1(),
        title: "JS",
        isDone: false,
      },
    ],
    [todolistId2]: [
      {
        id: v1(),
        title: "HTML",
        isDone: true,
      },
      {
        id: v1(),
        title: "CSS",
        isDone: true,
      },
      {
        id: v1(),
        title: "JS",
        isDone: false,
      },
    ],
  });

  function removeTask(todolistId: string, taskId: string) {
    let tasksInTodolist = tasks[todolistId];

    let filteredTasks = tasksInTodolist.filter((t) => t.id !== taskId);
    tasks[todolistId] = filteredTasks;
    setTasks({ ...tasks });
  }

  function changeStatus(todolistId: string, taskId: string, value: boolean) {
    let tasksInTodolist = tasks[todolistId];

    let task = tasksInTodolist.find((t) => t.id === taskId);

    if (task) {
      task.isDone = value;
      setTasks({ ...tasks });
    }
  }

  function addTask(todolistId: string, title: string) {
    let tasksInTodolist = tasks[todolistId];

    let newTask = {
      id: v1(),
      title: title,
      isDone: false,
    };

    tasks[todolistId] = [newTask, ...tasksInTodolist];

    setTasks({ ...tasks });
  }

  function changeFilter(todolistId: string, value: FilterValueType) {
    let todolist = todolists.find((t) => t.id === todolistId);

    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists]);
    }
  }

  function editTaskTitle(todolistId: string, taskId: string, title: string) {
    let tasksInTodolist = tasks[todolistId];

    let task = tasksInTodolist.find((t) => t.id === taskId);
    if (task) {
      task.title = title;
      setTasks({ ...tasks });
    }
  }

  function addTodolist(title: string){
    let newTodolist: TodolistProps = {
      id: v1(),
      title: title,
      filter: "all"
    }

    setTodolists([newTodolist, ...todolists])
    setTasks({
      ...tasks,
      [newTodolist.id]: []
    })
  }

  function editTodolistTitle(todolistId: string, title: string) {
    let todolist = todolists.find(t => t.id === todolistId)
    if(todolist){
      todolist.title = title
      setTodolists([...todolists]);
    }
  }

  return (
    <div className="App">
      <AddItemForm callBack={(title: string) => addTodolist(title)} />

      {todolists.map((tl) => {
        let filteredTasks = tasks[tl.id];

        if (tl.filter === "active") {
          filteredTasks = filteredTasks.filter((t) => t.isDone === false);
        }

        if (tl.filter === "completed") {
          filteredTasks = filteredTasks.filter((t) => t.isDone === true);
        }

        return (
          <Todolist
            id={tl.id}
            title={tl.title}
            tasks={filteredTasks}
            removeTask={removeTask}
            changeStatus={changeStatus}
            addTask={addTask}
            changeFilter={changeFilter}
            filter={tl.filter}
            editTaskTitle={editTaskTitle}
            editTodolistTitle={editTodolistTitle}
          />
        );
      })}
    </div>
  );
}

export default App;
