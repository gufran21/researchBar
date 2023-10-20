

import { Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import Research from "./component/Research";
function App() {
 
  return (
    <div className="App">
    <Home/>
   <Routes>
  <Route path="/research" element={<Research/>}></Route>
   </Routes>
  </div>
  );
}

export default App;
