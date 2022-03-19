import React from 'react';
import ImageGrid from './imagegrid.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      select: 'all',
      pageNum: 1,
      pageCount: 10,
      data: []
    }
    this.changeSelection = this.changeSelection.bind(this)
    this.decPage = this.decPage.bind(this)
    this.incPage = this.incPage.bind(this)
    this.changePageCount = this.changePageCount.bind(this)
    this.getRequest = this.getRequest.bind(this)
    this.updateItem = this.updateItem.bind(this)
  }
  componentDidMount() {
    this.getRequest()
  }
  getRequest() {
    const { select, pageCount, pageNum } = this.state
    const start = pageCount * (pageNum - 1)
    axios(`http://localhost:4600/images?skip=${start}&limit=${pageCount}&status=${select}`)
      .then(result => {
        this.setState({
          data: result.data
        })
      })
  }
  async changeSelection(e) {
    await this.setState({
      select: e.target.value
    })
    this.getRequest()
  }
  async incPage(e) {
    const newPage = this.state.pageNum + 1
    await this.setState({
      pageNum: newPage
    })
    this.getRequest()
  }
  async decPage(e) {
    const newPage = this.state.pageNum - 1
    if (newPage > 0) {
      await this.setState({
        pageNum: newPage
      })
    }
    this.getRequest()
  }
  async changePageCount(e) {
    const newCount = e.target.value
    await this.setState({
      pageCount: newCount
    })
    this.getRequest()
  }
  updateItem(id, status) {
    axios.put(`http://localhost:4600/images?id=${id}&status=${status}`)
      .then((result) => {
        this.getRequest()
      })
  }
  render() {
    return (
      <div>
        <div>
          Select which images to view:
          <select id="foam-select" onChange={this.changeSelection}>
            <option value="all">All</option>
            <option value="foam">Foam</option>
            <option value="nofoam">No Foam</option>
            <option value="unclassified">Unclassified</option>
          </select>
        </div>
        <div>
          <label>Images per page</label>
          <select id='page-count' value={this.state.pageCount} onChange={this.changePageCount}>
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>

        <div>
          <button value='less' onClick={this.decPage}>-</button>
          Page # {this.state.pageNum}
          <button value='more' onClick={this.incPage}>+</button>
        </div>

        <ImageGrid
          selection={this.state.select}
          data={this.state.data}
          updateItem={this.updateItem}
        />
      </div>
    )
  }
}

export default App;