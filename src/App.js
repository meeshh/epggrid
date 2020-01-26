import React from 'react';

import './App.scss';
import TopBar from './components/topbar/topbar';
import ChannelsPanel from './components/channelspanel/channelspanel';
import MainContainer from './components/maincontainer/maincontainer';
import { ChannelsProvider } from './contexts/channelscontext';

const App = () => {

  

  return (
    <ChannelsProvider>
      <div className="App">
        <TopBar />
        <div className='epgContainer'>
          <ChannelsPanel />
          <MainContainer />
        </div>
      </div>
    </ChannelsProvider>
  );
}

export default App;
