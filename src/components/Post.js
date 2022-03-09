import { useState, useEffect } from "react";

function Post(props) {
  const { id, secret, server, title } = props.data;

  return (
    <li>
      <img src={`https://live.staticflickr.com/${server}/${id}_${secret}.jpg`} alt={title} />
    </li>
  );
}

export default Post;