import { useState } from "react";
import ItemAdd from "./ItemAdd";
import ListsToDo from "./ListsToDo";
import { initialToDoList } from "../../data";
import "../../styles/todo.css";

export default function ToDoApp() {
  const [listToDo, setListToDo] = useState(initialToDoList);

  return (
    <div className="to-do-app">
      <ItemAdd listToDo={listToDo} setListToDo={setListToDo} />
      <ListsToDo listToDo={listToDo} setListToDo={setListToDo} />
    </div>
  );
};