import { useState } from "react";
import ToDoEdit from "./ToDoEdit";

const ToDoNew = ({ listToDo, setListToDo }) => {
  const [editMode, setEditMode] = useState(false);

  return editMode ? (
    <ToDoEdit
      task=""
      setEditMode={setEditMode}
      listToDo={listToDo}
      setListToDo={setListToDo}
    />
  ) : (
    <div style={{ textAlign: "right", marginRight: 16 }}>
      <button className="item-addbtn" title="Add new task" onClick={() => setEditMode(true)}>+</button>
    </div>
  );
};

export default ToDoNew;