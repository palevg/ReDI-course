import ToDoItem from "./ToDoItem";

const ToDoList = ({ listToShow, listToDo, setListToDo }) => {
  return listToShow.map((task) => (
    <ToDoItem
      key={task.id}
      task={task}
      listToDo={listToDo}
      setListToDo={setListToDo}
    />
  ));
};

export default ToDoList;