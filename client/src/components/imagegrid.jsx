import React from 'react';
import ImageTile from './imagetile.jsx';
import axios from 'axios';

const ImageGrid = (props) => {
  const { data, updateItem } = props;
  const map = data.map((file) => <ImageTile key={file._id} file={file} updateItem={updateItem} />)
  return <div className='grid'>{map}</div>
}

export default ImageGrid;