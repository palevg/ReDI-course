import { useEffect, useRef, useState } from "react";

const ToDoEdit = ({ task, setEditMode, listToDo, setListToDo }) => {
  const [newToDoText, setNewToDoText] = useState(task === "" ? "" : task.todo);
  const taskPriority = useRef();
  const taskDeadline = useRef();
  const minTaskLength = 3;

  const handleAddToDo = () => {
    if (task === "") {
      setListToDo([
        ...listToDo,
        {
          todo: newToDoText.trim(),
          complete: false,
          id: Date.now(),
          priority: taskPriority.current.value,
          deadline: taskDeadline.current.value
        }
      ]);
      setNewToDoText("");
    } else {
      setListToDo(
        listToDo.map((item) => {
          if (item.id === task.id) {
            item.todo = newToDoText.trim();
            item.priority = taskPriority.current.value;
            item.deadline = taskDeadline.current.value;
          }
          return item;
        })
      );
    }
    setEditMode(false);
  };

  useEffect(() => {
    if (task !== "") {
      taskPriority.current.value = task.priority;
      taskDeadline.current.value = task.deadline;
    }
  }, [task]);

  return (
    <div className="edit-block">
      <div className="edit-line">
        <label htmlFor="todo-text">Task name</label>
        <input
          id="todo-text"
          className="input-field"
          placeholder="what do you need to do?"
          value={newToDoText}
          onChange={(e) => setNewToDoText(e.target.value)}
        />
      </div>
      <div className="edit-line">
        <label htmlFor="todo-date">Priority</label>
        <select className="input-field" ref={taskPriority} id="todo-date">
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <div className="edit-line">
        <label htmlFor="todo-date">Task deadline</label>
        <input
          className="input-field"
          type="datetime-local"
          ref={taskDeadline}
          id="todo-date"
        />
      </div>
      <div className="edit-block__btns">
        <button
          disabled={newToDoText.trim().length < minTaskLength}
          onClick={handleAddToDo}
        >
          {task === "" ? "Save new task" : "Save changes"}
        </button>
        <button onClick={() => setEditMode(false)}>Cancel</button>
      </div>
    </div>
  );
};

export default ToDoEdit;