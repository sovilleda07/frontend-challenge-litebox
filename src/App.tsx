import { Navbar } from './components/layout/Navbar';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onNewPost={() => console.log('new post')} />
      <main className="flex-1" />
    </div>
  );
}

export default App;
