import TaskSide from "../components/TaskSide";
import TicTacToe from "../components/Tic-Tac-Toe";

export default function TicTacToePage() {
  return (
    <div className="task-page">
      <TaskSide appNumber={5} imageClass="task-side__img" />
      <div className="decision-side">
        <h2>My decision</h2>
        <TicTacToe />
      </div>
    </div>
  );
};