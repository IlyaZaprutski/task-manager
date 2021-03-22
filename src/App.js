import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

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
    </Layout>
  );
};

export default App;
