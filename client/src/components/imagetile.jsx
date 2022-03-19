import React from 'react';
import axios from 'axios';

class ImageTile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.file._id,
      url: this.props.file.url,
      status: this.props.file.status
    }
    this.markStatus = this.markStatus.bind(this)
  }

  markStatus(e) {
    const newStatus = e.target.id
    this.setState({
      status: newStatus
    })
    this.props.updateItem(this.state.id,newStatus)
  }

  render() {
    const { id, url, status } = this.state
    var foamCheck = ""
    var noFoamCheck = ""
    if (status === 'foam') {
      foamCheck = "checked"
    } else if (status === 'nofoam') {
      noFoamCheck = "checked"
    }
    return (
      <div id={id} className='tile'>
        <img src={url} />
        <div>
          <input type="radio" id="foam" name={`selectfoam${id}`} value={id} onChange={this.markStatus} checked={foamCheck} />
          Foam
        </div>
        <div>
          <input type="radio" id="nofoam" name={`selectfoam${id}`} onChange={this.markStatus} checked={noFoamCheck} />
          No Foam
        </div>
      </div>
    )
  }
}

export default ImageTile;