import { useState } from "react";
import ToDoList from "./ToDoList";

const ToDoListCompl = ({ listToShow, listToDo, setListToDo }) => {
  const [showCompleted, setShowCompleted] = useState(false);

  return (
    <>
      {listToShow.length > 0 && (
        <button
          onClick={() =>
            showCompleted ? setShowCompleted(false) : setShowCompleted(true)
          }
        >
          {showCompleted ? "Hide" : "Show"} completed tasks
        </button>
      )}
      {showCompleted && (
        <ToDoList
          listToShow={listToShow}
          listToDo={listToDo}
          setListToDo={setListToDo}
        />
      )}
    </>
  );
};

export default ToDoListCompl;