import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Detail extends Component {
  constructor(){
    super();
    this.state = {
      detail: null,
      isLoading: false,
      hasErrors: false
    }
  }
  componentDidMount(){
    let {itemid} = this.props.match.params;
    axios.get(`/api/things/byid/${itemid}`)
      .then((resp)=>{
        this.setState({detail: resp.data, isLoading:false, hasErrors:false});
      })
      .catch((err)=>{
        this.setState({detail:null, isLoading:false, hasErrors:err});
      })
  }
  render(){
    let itemId = this.props.match.params.itemid;
    let itemBody = null;
    if(this.state.detail){
      let {desc, due, author} = this.state.detail;
      itemBody = (
        <div>
          <h1>{itemId}</h1>
          <b>{desc}</b><br />
          <b>{due}</b><br />
          <b>{author}</b><br />
        </div>
      );
    }
    return (
      <div>
        {itemBody}
        <Link to="/list">Regresar</Link>
      </div>
      );
  }
}
export default Detail;
