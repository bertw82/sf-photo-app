import '../css/App.css';
import {useState, useEffect} from 'react';
import apiKey from '../config/apiKey';
import userId from '../config/userId';
import Pagination from './Pagination';
import Video from './Video';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&user_id=${userId}&format=json&nojsoncallback=1`;

  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  // const [video, setVideo]  =useState([]);

  useEffect(() => {
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong!');
        }
      })
      .then(posts => setPosts(posts.photos.photo))
      .catch(error => setError(error.message))
  }, [url]);

  // displayVideo() {

  // }

  if (error) {
    return <h1>{error}</h1>;
  } else {
    return (
        <Routes>
          <Route path="/" element={<Video />} />
          <Route path="/gallery" element={
            <Pagination
              data={posts}
              title="Pictures"
              dataLimit={7}
            />
          } />         
        </Routes>
   
    );
  }
  
}

export default App;
