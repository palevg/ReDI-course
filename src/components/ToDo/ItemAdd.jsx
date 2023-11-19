import { useState } from "react";
import ItemEdit from "./ItemEdit";

const ItemAdd = ({ listToDo, setListToDo }) => {
  const [editMode, setEditMode] = useState(false);

  return editMode ? (
    <ItemEdit
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

export default ItemAdd;