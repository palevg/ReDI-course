import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Error from '../pages/Error';
import AnimalsPage from '../pages/Animals';
import PortfolioPage from '../pages/Portfolio';
import ToDoPage from '../pages/ToDo';
import TicTacToePage from '../pages/Tic-Tac-Toe';
import CalcPage from "../pages/Calc";
import QuotesPage from '../pages/Quotes';
import ProductsPage from '../pages/Products';
import UserPage from '../pages/UserPage';
import Jokes from '../pages/Jokes';

const AppRouter = () => {

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='/animals' element={<AnimalsPage />} />
      <Route path='/portfolio' element={<PortfolioPage />} />
      <Route path='/todo' element={<ToDoPage />} />
      <Route path='/tic-tac-toe' element={<TicTacToePage />} />
      <Route path='/calculator' element={<CalcPage />} />
      <Route path='/quotes' element={<QuotesPage />} />
      <Route path='/products' element={<ProductsPage />} />
      <Route path='/activity' element={<UserPage />} />
      <Route path='/jokes' element={<Jokes />} />
      <Route path="*" element={<Error />} />
    </Routes>
  )
}

export default AppRouter;