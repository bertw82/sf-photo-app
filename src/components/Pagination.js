import { useState, useEffect } from "react";
import Post from "./Post";
import {Link} from "react-router-dom";

function Pagination({
  data,
  title,
  dataLimit,
  error
}) {

  const [currentPage, setCurrentPage] = useState(1);
  const [pictures, setPictures] = useState('');

  useEffect(() => {
    // function to show the pictures on the page, limited to the dataLimit (currently 9)
    function showData(page) {
      const startIndex = (page * dataLimit) - dataLimit;
      const endIndex = page * dataLimit;
      let pictures = [];
      for (let i = startIndex; i < endIndex; i++) {
        pictures.push(<Post data={data[i]} key={i} />)
      }
      // set pictures for the current page selected
      setPictures(pictures);
    }
    // show the pictures for the current page
    showData(currentPage);
    // Scroll to the top of the page
    window.scrollTo({ behavior: 'smooth', top: '0px' });
  }, [currentPage, data, dataLimit])

  // listen for button clicks, then change the current page to the button selected
  function changePage(event) {
    const pageNumber = event;
    setCurrentPage(pageNumber);
  }

  // add pagination buttons
  function addPagination() {
    const buttonNumber = Math.ceil(data.length / dataLimit);
    let buttons = [];
    for (let i = 1; i < (buttonNumber +1); i++) {
      buttons.push(
        <li key={i}><button onClick={() => changePage(i)} >{i}</button></li>
      )
    }
    return buttons;
  }

  if (error) {
    return (
      <div>
        <h1>Uh Oh! Something is not working!</h1>
      </div>
    ); 
  } else if (data.length > 0) {
    return (
      <div className="dataContainer">
        <h1>{title}</h1>
        <button className="home-button"><Link to="/home">Home</Link></button>
        <ul className="pictureList">
          {pictures}
        </ul>
        <ul className="buttonList">
          {addPagination()}
        </ul>
      </div>
    )
  } else {
    return (
      <h1>Loading...</h1>
    )
  }
}
    


export default Pagination;