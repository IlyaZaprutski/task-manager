import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ProcessesPage } from 'features/processesPage';
import { ProcessJobsPage } from 'features/processJobsPage';

const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  background: #f7f8fc;
`;

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/jobs/:processId">
          <ProcessJobsPage />
        </Route>

        <Route path="/">
          <ProcessesPage />
        </Route>
      </Switch>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <ToastContainer />
    </Layout>
  );
};

export default App;
