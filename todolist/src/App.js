import './App.css';
import List from '../src/features/list/listItems';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <div className='container-form'>
        <h1 className='my-4'>To-do list</h1>
        <List />
      </div>
    </div>
  );
}

export default App;
