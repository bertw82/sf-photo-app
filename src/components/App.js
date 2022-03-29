import '../css/App.css';
import {useState, useEffect} from 'react';
import Pagination from './Pagination';
import NotFound from './NotFound';
import Video from './Video';
import {
  BrowserRouter as Router,
  useRoutes,
  Navigate
} from "react-router-dom";

/**
* In this function I make an API call to my Netlify function then pass the pictures to the Pagination Component  
*/
function AppContents() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPictures() {
      const url = `/.netlify/functions/flickrURL`;
      try {
        setLoading(true);
        await fetch(url)
        .then(res => res.json())
        .then(res => setPosts(res.photos.photo));
      } catch(err) {
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPictures();
  }, []);

  // the only way I could pass the react-testing-library test was to use useRoutes() then wrap the routes in another component
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
        isLoading={loading}
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
