import { useState } from "react";
import ItemToDo from "./ItemToDo";

const CurrentTasks = ({ listToShow, listToDo, setListToDo }) => {
  return listToShow.map((task) => (
    <ItemToDo
      key={task.id}
      task={task}
      listToDo={listToDo}
      setListToDo={setListToDo}
    />
  ));
};

const CompletedTasks = ({ listToShow, listToDo, setListToDo }) => {
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
        <CurrentTasks
          listToShow={listToShow}
          listToDo={listToDo}
          setListToDo={setListToDo}
        />
      )}
    </>
  );
};

const ListsToDo = ({ listToDo, setListToDo }) => {
  const activeTasks = listToDo.filter((task) => task.complete === false);

  return (
    <div>
      <h3>
        {activeTasks.length > 0
          ? "List To Do"
          : "You don't have any tasks To Do!"}
      </h3>
      {activeTasks.length > 0 && (
        <CurrentTasks
          listToShow={activeTasks}
          listToDo={listToDo}
          setListToDo={setListToDo}
        />
      )}
      <CompletedTasks
        listToShow={listToDo.filter((task) => task.complete === true)}
        listToDo={listToDo}
        setListToDo={setListToDo}
      />
    </div>
  );
};

export default ListsToDo;