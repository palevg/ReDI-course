import TaskSide from "../components/TaskSide";
import Quotes from "../components/Quotes";

export default function QuotesPage() {
  return (
    <div className="task-page">
      <TaskSide appNumber={4} imageClass="task-side__img-w" />
      <div className="decision-side">
        <h2>My decision</h2>
        <Quotes />
      </div>
    </div>
  );
};