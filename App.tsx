import Home from './src/Home';
import {useEffect, useState} from 'react';
import HeightContext from './src/HeightContext';
import {StatusBar} from 'react-native';

const App = () => {
  const [darkTheme, setDarkTheme] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(50);

  useEffect(() => {
    StatusBar.setBarStyle('light-content', true);
    StatusBar.setBackgroundColor('#0996AE');
  }, []);

  return (
    <HeightContext.Provider value={{height, setHeight, darkTheme}}>
      <Home handleTheme={setDarkTheme} themeColor={darkTheme} />
    </HeightContext.Provider>
  );
};

export default App;
