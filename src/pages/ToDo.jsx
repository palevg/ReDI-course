import TaskSide from "../components/TaskSide";
import ToDoApp from "../components/ToDo";

export default function ToDoPage() {
  return (
    <div className="task-page">
      <TaskSide appNumber={2} imageClass="task-side__img-w" />
      <div className="decision-side">
        <h2>My decision</h2>
        <ToDoApp />
      </div>
    </div>
  );
};