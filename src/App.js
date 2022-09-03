import './App.css';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
  const apikey = "fd5b69691fc948e9864e8c62c2751b06";

  const [progress, setProgress] = useState(0);
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <LoadingBar
          color='red'
          height={3}
          progress={progress}
        />
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} key='general' category='general' country='in' apikey={apikey} pageSize='9' />} />
          <Route exact path="/science" element={<News setProgress={setProgress} key='science' category='science' country='in' apikey={apikey} pageSize='9' />} />
          <Route exact path="/general" element={<News setProgress={setProgress} key='general' category='general' country='in' apikey={apikey} pageSize='9' />} />
          <Route exact path="/sports" element={<News setProgress={setProgress} key='sports' category='sports' country='in' apikey={apikey} />} pageSize='9' />
          <Route exact path="/health" element={<News setProgress={setProgress} key='health' category='health' country='in' apikey={apikey} />} pageSize='9' />
          <Route exact path="/business" element={<News setProgress={setProgress} key='business' category='business' country='in' apikey={apikey} pageSize='9' />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress} key='entertainment' category='entertainment' country='in' apikey={apikey} pageSize='9' />} />
          <Route exact path="/technology" element={<News setProgress={setProgress} key='technology' category='technology' country='in' apikey={apikey} pageSize='9' />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}


export default App
