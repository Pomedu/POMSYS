import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='content'>
        <Routes>
          <Route element={<ClientLayout />}>
          </Route>
          <Route element={<AdminLayout/>}>
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
