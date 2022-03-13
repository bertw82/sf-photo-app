import { useState, useEffect } from "react";
import Post from "./Post";

function Pagination({
  data,
  title,
  dataLimit
}) {

  const [currentPage, setCurrentPage] = useState(1);
  const [pictures, setPictures] = useState('');

  useEffect(() => {
    function showData(page) {
      const startIndex = (page * dataLimit) - dataLimit;
      const endIndex = page * dataLimit;
      let pictures = [];
      for (let i = startIndex; i < endIndex; i++) {
        pictures.push(<Post data={data[i]} key={i} />)
      }
      setPictures(pictures);
    }
    showData(currentPage);
    window.scrollTo({ behavior: 'smooth', top: '0px' });
  }, [currentPage, data, dataLimit])

  function changePage(event) {
    const pageNumber = event;
    setCurrentPage(pageNumber);
  }

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

  if (data.length > 0) {
    return (
      <div className="dataContainer">
        <h1>{title}</h1>
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