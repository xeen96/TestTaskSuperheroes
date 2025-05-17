import { Layout } from './layout/layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SuperheroProvider } from './context/SuperheroContext';

import Home from './pages/home/Home';
import Editor from './pages/editor/Editor';

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <SuperheroProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Editor />} />
            <Route path="/edit/:nickname" element={<Editor />} />
          </Routes>
        </SuperheroProvider>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
