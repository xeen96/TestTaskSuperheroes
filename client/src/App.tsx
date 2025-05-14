import { Layout } from './layout/layout';
import { BrowserRouter } from 'react-router-dom';
import Home from './pages/home';

function App() {
  
  return (
    <Layout>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </Layout>
  )
}

export default App
