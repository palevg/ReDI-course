import { useState } from "react";
import ItemEdit from "./ItemEdit";

const ItemToDo = ({ task, listToDo, setListToDo }) => {
  const [editMode, setEditMode] = useState(false);

  const completeTask = (value) => {
    setListToDo(
      listToDo.map((item) => {
        if (item.id === task.id) {
          return { ...item, complete: value };
        }
        return item;
      })
    );
  };

  return (
    <>
      <div
        className={
          task.complete
            ? "item-todo item-completed"
            : task.priority === "High"
              ? "item-todo item-highpriority"
              : task.priority === "Medium"
                ? "item-todo item-mediumpriority"
                : "item-todo item-notcompleted"
        }
      >
        <div>
          <strong>{task.todo}</strong>
          <div>
            Priority: <strong>{task.priority}</strong>
          </div>
          {task.deadline !== "" && (
            <div>
              Deadline: <strong>{task.deadline}</strong>
              {!task.complete && Date.now() > Date.parse(task.deadline) && (
                <span className="item-overdue">Overdue!</span>
              )}
            </div>
          )}
        </div>
        <div>
          {task.complete && (
            <span
              className="button-task"
              onClick={() => completeTask(false)}
              title="Do it again!"
            >
              &#8634;
            </span>
          )}
          {!task.complete && (
            <span
              className="button-task"
              onClick={() => completeTask(true)}
              title="Mark as completed"
            >
              &#10004;
            </span>
          )}
          {!task.complete && (
            <span
              className="button-task"
              onClick={() => setEditMode(true)}
              title="Edit task"
            >
              &#9998;
            </span>
          )}
          <span
            className="button-task"
            onClick={() =>
              setListToDo(listToDo.filter((item) => item.id !== task.id))
            }
            title="Delete task"
          >
            &#10006;
          </span>
        </div>
      </div>
      {editMode && (
        <ItemEdit
          task={task}
          setEditMode={setEditMode}
          listToDo={listToDo}
          setListToDo={setListToDo}
        />
      )}
    </>
  );
};

export default ItemToDo;