import React, {Component} from 'react';
import axios from 'axios';
import './List.css';

function ListItem(props){
  return(
    <div key={props._id}>
      <b>{props.desc}</b>
    </div>
  );
}

class List extends Component{
  constructor(){
    super();
    this.state = {
      things:[],
      isLoading: false,
      error: false,
    }
  }
  componentDidMount(){
      this.setState({isLoading:true});
      axios.get('/api/things')
        .then( (resp)=>{
          this.setState({things:resp.data, isLoading:false});
        })
        .catch( (err)=>{
          alert(err);
        })
      ;
  }
  render(){
    let listItems = [];
    if(this.state.things.length > 0 ){
      listItems = this.state.things.map((o, i)=>{
        return (<ListItem {...o} />);
      });
    }
    return (
      <div className="listHolder">
      <h1>Lista</h1>
      <h2>Documentos {this.state.things.length}</h2>
      <div>
        {listItems}
      </div>
      { (this.state.isLoading)? "...Cargando": null }
      </div>
    )
  }
}

export default List;
