import ToDoList from "./ToDoList";
import ToDoListCompl from "./ToDoListCompl";

const ToDoLists = ({ listToDo, setListToDo }) => {
  const activeTasks = listToDo.filter((task) => task.complete === false);

  return (
    <div>
      <h3>
        {activeTasks.length > 0
          ? "List To Do"
          : "You don't have any tasks To Do!"}
      </h3>
      {activeTasks.length > 0 && (
        <ToDoList
          listToShow={activeTasks}
          listToDo={listToDo}
          setListToDo={setListToDo}
        />
      )}
      <ToDoListCompl
        listToShow={listToDo.filter((task) => task.complete === true)}
        listToDo={listToDo}
        setListToDo={setListToDo}
      />
    </div>
  );
};

export default ToDoLists;