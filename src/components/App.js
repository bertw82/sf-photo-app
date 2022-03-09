import '../css/App.css';
import {useState, useEffect} from 'react';
import apiKey from '../config/apiKey';
import userId from '../config/userId';
import Pagination from './Pagination';
import Post from './Post';

function App() {
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&user_id=${userId}&format=json&nojsoncallback=1`;

  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(url)
      .then(response => {
        // console.log(response.json())
        if (response.ok) {
          console.log(response)
          return response.json();
        } else {
          throw new Error('Something went wrong!');
        }
      })
      .then(posts => setPosts(posts.photos.photo))
      .catch(error => setError(error.message))
  }, []);

  console.log(posts);

  if (error) return <h1>{error}</h1>;

  return (
    <div>
      {posts.length > 0 ? (
        <>
          <Pagination
            data={posts}
            RenderComponent={Post}
            title="Pictures"
            pageLimit={5}
            dataLimit={7}
          />
        </>
      ) : (
       <h1>Loading...</h1>
      )}
    </div>
  );
}

export default App;
