import React, { useEffect } from 'react';
import useRequest, { FetchState } from './hooks/useRequest';
import './App.css';

interface MusicItem {
  trackId?: number;
  trackName?: string;
}

interface MusicResponse {
  results?: any;
}

function App() {

  const [searchTerm, setSearchTerm] = React.useState('madonna');
  const musicRequest: FetchState<MusicResponse> = useRequest(`https://itunes.apple.com/search?term=${searchTerm}&limit=100`);
  const { data, error, loading } = musicRequest;

  // useEffect(() => {
  //   // This code runs after the component renders
  //   console.log(data?.results);
  // }, [loading]);

  return (
    <div className="App">
      <header className="App-header">
        <form>
          <input type="text" placeholder="Search Music" onChange={e => setSearchTerm(e.target.value)} />
          <button type="submit">Search</button>
        </form>
      </header>
      <main>
        <ol>
          {data ? data?.results?.map((item: any) => (
            <li key={item.trackId}>{item?.artistName}</li>
          )) : 'No data available'}
        </ol>

      </main>
    </div>
  );
};

export default App;
