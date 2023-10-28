import TaskSide from "../components/TaskSide";
import JokesApp from "../components/JokesApp";

export default function Jokes() {
  return (
    <div className="task-page">
      <TaskSide appNumber={8} imageClass="task-side__img" />
      <div className="decision-side">
        <h2>My decision</h2>
        <JokesApp />
      </div>
    </div>
  );
};