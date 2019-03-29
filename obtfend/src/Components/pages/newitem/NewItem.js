import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Body from '../../generics/body/Body';
import Input from '../../generics/input/Input';
class NewItem extends Component{
  constructor(){
    super();
    this.state = {
      txtDesc:"",
      txtDescError:"",
      txtAutor:"",
      txtAutorError:"",
      txtTipo:"",
      txtTipoError:"",
      redirectTo:"",
      error:""
    }
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
  }
  onChangeHandler(e){
      let {name, value} = e.currentTarget;
      this.setState({[name]:value});
  }
  onBlurHandler(e){
    let { name, value } = e.currentTarget;
  }
  onClickHandler(e){
    e.preventDefault();
    e.stopPropagation();
    axios.post(
        `api/things/new`,
        {
          desc:this.state.txtDesc,
          author:this.state.txtAutor,
          type:this.state.txtTipo
        }
      ).then(
        (resp)=>{
          this.setState({ redirectTo:"/list"});
        }
      )
      .catch(
        (err)=>{
          this.setState({error:err});
        }
      );
  }
  render(){
    if(this.state.redirectTo!==""){
      return (
        <div>
          <Link to={this.state.redirectTo}>Item Agregado Satisfactoriamente</Link>
        </div>
      )
    }
    return (
      <div>
        <h1>Nuevo One Big Thing</h1>
        <Body>
          <Input
              inputLabel        ="Descripción"
              inputName         ="txtDesc"
              inputType         ="text"
              inputPlaceholder  ="Descripción de la tarea a realizar"
              inputValue        ={this.state.txtDesc||null}
              inputErrorMsg     ={this.state.txtDescError||null}
              inputChangeHandler={this.onChangeHandler}
              inputBlurHandler  ={this.onBlurHandler}
          />
          <Input
            inputLabel="Autor"
            inputName="txtAutor"
            inputType="text"
            inputPlaceholder="Autor de la Tarea"
            inputValue={this.state.txtAutor || null}
            inputErrorMsg={this.state.txtAutorError || null}
            inputChangeHandler={this.onChangeHandler}
            inputBlurHandler={this.onBlurHandler}
          />
          <Input
            inputLabel="Tipo"
            inputName="txtTipo"
            inputType="text"
            inputPlaceholder="Small | Big"
            inputValue={this.state.txtTipo || null}
            inputErrorMsg={this.state.txtTipoError || null}
            inputChangeHandler={this.onChangeHandler}
            inputBlurHandler={this.onBlurHandler}
          />
          <button onClick={this.onClickHandler}>Agregar</button>
          <div>
            {this.state.error}
          </div>
        </Body>
      </div>
    );
  }
}

export default NewItem;
