import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Home from './components/Home'

function App() {
  return (
    // This div uses CSS Grid to arrange the components
    <div className='grid-container'>
      <Header />  {/* Renders the top header bar */}
      <Sidebar /> {/* Renders the left navigation sidebar */}
      <Home />    {/* Renders the main dashboard content area */}
    </div>
  )
}

export default App;
