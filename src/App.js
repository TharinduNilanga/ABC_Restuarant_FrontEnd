import './App.css';
import About from './components/landingPage/About';
import Commitment from './components/landingPage/Commitment';
import Location from './components/landingPage/Locations';
import Facilities from './components/landingPage/Facilities';
import Contact from './components/landingPage/Contact';
import Nav from './components/landingPage/Nav';
import Footer from './components/landingPage/Footer';
import Products from './components/landingPage/Products';

function App() {
  return (
    <div className="App" style={{ overflowX: 'hidden' }}>
      <Nav />
      <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
        <img
          src="/assets/landingPage1.png"
          alt="background"
          id="home"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>
      {/* <About /> */}
      {/* <Commitment /> */}
      {/* <Products /> */}
      {/* <Facilities /> */}
      {/* <Location /> */}
      {/* <Contact /> */}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
