import './index.css';
import AppRouter from './routes/AppRouter';
// import Layout from './Layout';

import { AuthProvider } from './context/AuthContext';

const App = () => (
      <AuthProvider>
        <AppRouter/>
        {/* <Layout /> */}
      </AuthProvider>
);

export default App;