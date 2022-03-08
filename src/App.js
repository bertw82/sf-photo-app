import './App.css';
import {useState, useEffect} from 'react';
import apiKey from './config';
import userId from './userId';

function App() {
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&user_id=${userId}&format=json&nojsoncallback=1`;

  const [post, setPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Somthing went wrong!');
        }
      })
  }, []);

  function Post(props) {
    const { id, secret, server, title } = props.data;
    return (
      <li key={id}>
        <img src={`https://live.staticflickr.com/${server}/${id}_${secret}.jpg`} alt={title} />
      </li>
    );
  }

  return (
    error ? <h1>{error}</h1>
    : <div></div>
  );
}

export default App;
