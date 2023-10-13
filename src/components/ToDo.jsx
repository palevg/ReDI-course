import { useState } from "react";
import ToDoLists from "./ToDoLists";
import ToDoNew from "./ToDoNew";
import { initialToDoList } from "../data";
import "../styles/todo.css";

export default function ToDoApp() {
  const [listToDo, setListToDo] = useState(initialToDoList);

  return (
    <div className="to-do-app">
      <ToDoNew listToDo={listToDo} setListToDo={setListToDo} />
      <ToDoLists listToDo={listToDo} setListToDo={setListToDo} />
    </div>
  );
};