import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import HomePage from './HomePage';
import UpdateUser from './UpdateUser';
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<HomePage></HomePage>}></Route>
        <Route path='/updateUser/:id' element={<UpdateUser></UpdateUser>}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
