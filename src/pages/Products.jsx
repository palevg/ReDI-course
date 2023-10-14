import TaskSide from "../components/TaskSide";
import Products from "../components/Products";

export default function ProductsPage() {
  return (
    <div className="task-page">
      <TaskSide appNumber={6} imageClass="task-side__img-w" />
      <div className="decision-side">
        <h2>My decision</h2>
        <Products />
      </div>
    </div>
  );
};