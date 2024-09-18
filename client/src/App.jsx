import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StoryForm from './components/StoryForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StoryForm />} />
      </Routes>
    </Router>
  );
}

export default App;
