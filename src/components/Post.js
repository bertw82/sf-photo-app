function Post(props) {
  if (props.data) {
    const { id, secret, server, title } = props.data;
    return (
      <li>
        <img src={`https://live.staticflickr.com/${server}/${id}_${secret}_b.jpg`} alt={title} />
      </li>
    );
  } else {
    return (
      <li></li>
    )
  }
 
}

export default Post;