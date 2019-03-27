import React, { Component } from 'react';
import Header from '../../generics/header/Header';
import Body from '../../generics/body/Body';
import Input from '../../generics/input/Input';

/**
 inputBlurHandler={(e)=>{alert(e.currentTarget.name)}}
 */
class Login extends Component {
  constructor(){
    super();
    this.state = {
      "txtPswd":"",
      "txtEmail":""
    }
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }
  render() {
    return (
      <div>
        <Header title="Inicio de Sesión"></Header>
        <Body>
          <Input
              inputLabel="Correo Electrónico"
              inputName="txtEmail"
              inputType="email"
              inputPlaceholder="Correo Electróncio"
              inputValue={this.state.txtEmail}
              inputErrorMsg=""
              inputChangeHandler={this.onChangeHandler}
            />
            <Input
              inputLabel="Contraseña"
              inputName="txtPswd"
              inputType="password"
              inputPlaceholder="Contraseña"
              inputValue={this.state.txtPswd}
              inputErrorMsg=""
              inputChangeHandler={this.onChangeHandler}
            />
        </Body>
      </div>
    );
  }
  onChangeHandler(e){
    const {name, value} = e.currentTarget; //ES5 desctructor de objectos ||destructuring
    this.setState({...this.state, [name]:value});
  }
}

export default Login;
