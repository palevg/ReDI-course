import TaskSide from "../components/TaskSide";
import Calculator from "../components/Calculator";

export default function CalcPage() {
  return (
    <div className="task-page">
      <TaskSide appNumber={3} imageClass="task-side__img" />
      <div className="decision-side">
        <h2>My decision</h2>
        <Calculator />
      </div>
    </div>
  );
};