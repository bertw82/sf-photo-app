import '../css/App.css';
import {useState, useEffect} from 'react';
import apiKey from '../config/apiKey';
import userId from '../config/userId';
import Pagination from './Pagination';
import NotFound from './NotFound';
import Video from './Video';
import {
  BrowserRouter as Router,
  useRoutes,
  Navigate
} from "react-router-dom";

/**
* In this function I make an API call to Flickr then pass the pictures to the Pagination Component  
*/
function AppContents() {
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&user_id=${userId}&format=json&nojsoncallback=1`;

  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } 
      })
      .then(posts => setPosts(posts.photos.photo))
      .catch(error => setError(error.message))
  }, [url]);

  // the only way to pass the react-testing-library test was to use useRoutes() then wrap the routes in another component
  let routes = useRoutes([
    { path: "/",
      element: <Navigate replace to="/home" />
    },
    {
      path: "/home",
      element: <Video />
    },
    {
      path: "/gallery",
      element: <Pagination 
        data={posts}
        title="San Francisco Trip 1/22"
        dataLimit={9}
        error={error}
      />
    },
    {
      path: "*",
      element: <NotFound />
    }
  ]);
  return routes;
}
 
// wrap routes in a Router
function App() {
  return (
    <Router>
      <AppContents />
    </Router>
  );
}

export default App;
