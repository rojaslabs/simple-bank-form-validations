import './App.css';
import CreateAccount from './views/CreateAccount';
import Layout from './components/Layout';

function App() {
  return (
    <div className="App">
      <Layout>
        <CreateAccount/>
      </Layout>
    </div>
  );
}

export default App;
