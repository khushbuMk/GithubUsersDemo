import React from 'react';
import TabStackNavigator from './src/navigation/TabStack';
import { Provider } from 'react-redux';
import configureStore from './src/redux/configureStore';


const store = configureStore()

const App = () => {
  
  return (
    <Provider store={store}>
      <TabStackNavigator/>
    </Provider>
  );
};

export default App;