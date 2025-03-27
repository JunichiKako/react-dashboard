// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from './layouts/main-layout';
import Dashboard from './pages/dash-board';
import Projects from './pages/projects';
import NotFound from './pages/not-found';
import Settings from './pages/settings';

function App() {
  return (
    <BrowserRouter>
      <div className='font-sans antialiased text-gray-900 bg-gray-100'>
        <Routes>
          {/* メインレイアウトを適用するルート */}
          <Route element={<MainLayout />}>
            <Route path='/' element={<Navigate to='/dashboard' />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/settings' element={<Settings />} />
          </Route>

          {/* 404ページ */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
