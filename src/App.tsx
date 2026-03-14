import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onNewPost={() => console.log('new post')} />
      <main className="flex-1" />
      <Footer />
    </div>
  );
}

export default App;
