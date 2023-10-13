import TaskSide from "../components/TaskSide";
import MyPortfolio from "../components/Portfolio";

export default function PortfolioPage() {
  return (
    <div className="task-page">
      <TaskSide appNumber={0} imageClass="task-side__img-w" />
      <div className="decision-side">
        <h2>My decision</h2>
        <MyPortfolio />
      </div>
    </div>
  );
};