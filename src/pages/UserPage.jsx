import TaskSide from "../components/TaskSide";
import UserActivity from "../components/UserActivity";

export default function UserPage() {
  return (
    <div className="task-page">
      <TaskSide appNumber={7} imageClass="task-side__img-w" />
      <div className="decision-side">
        <h2>My decision</h2>
        <UserActivity />
      </div>
    </div>
  );
};