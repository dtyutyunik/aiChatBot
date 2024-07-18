
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatBot from './screens/Chatbot/Chatbot';

function App() {
  return (
  <>
  <Router>
    <Routes>
      <Route path="/" element={<ChatBot/>}/>
    </Routes>
  </Router>
  </>
  );
}

export default App;
