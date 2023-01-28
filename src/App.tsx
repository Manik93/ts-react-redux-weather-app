import { SearchView } from './features/search/SearchView';
import { WeatherView } from './features/weather/weatherView';
import './App.css';

function App() {
  const handleOnSearchChange = (searchData: any) => {
    console.log(searchData);
  };

  return (
    <div className="App">
      <SearchView onSearchChange={handleOnSearchChange} />
      <WeatherView />
    </div>
  );
}

export default App;
