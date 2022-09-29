import logo from './logo.svg';
import './App.css';
import ClientLayout from './Components/Layouts/ClientLayout';
import NotFound from './Pages/ErrorPages/NotFound';
import Forbidden from './Pages/ErrorPages/Forbidden';
import { Route, Routes, Navigate } from 'react-router-dom';
import AdminLayout from './Components/Layouts/AdminLayout';
import AdminLectureList from './Pages/AdminPages/LectureManage/AdminLectureList';

function App() {
  return (
    <div className="App">
      <div className='content'>
        <Routes>
          <Route element={<ClientLayout />}>
          </Route>
          <Route element={<AdminLayout/>}>
            <Route path='manage/lectures/list'element={<AdminLectureList/>}/>
          </Route>
          <Route path='/403' element={<Forbidden />}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
