import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import NewsItem from './components/NewsItem';

export default class App extends Component {
  c = "hello world";
  render() {
    return (
      <div>
        <Navbar/>
        <News/>
      </div>
    )
  }
}
