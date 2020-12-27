import React, { Component } from 'react';
import './style.css';
import {Link} from 'react-router-dom';
export default class Main extends Component {
    state= {
        username: ''
    }

    handle(event) {
        this.setState({username: event.target.value });
    }
    
    render(){

        return(
            <div className="main_form">
                <h1 className="main_title">Servidor de Email Simplificado</h1>
                <div className="form_total">
                    <h2 className="login">Login</h2>
                        <div className="form_user">
                            <input type="text" 
                                name="username" 
                                placeholder="Nome de usuário" 
                                className="username_input" 
                                onChange={this.handle.bind(this)} 
                            required/>
                            {this.state.username.length !== 0? (
                                <Link to={`/user/${this.state.username}`} className="enter_user">
                                    Acessar
                                </Link>
                            ) : (
                                <Link to={`/`} className="enter_user">
                                    Acessar
                                </Link>
                            )}
                        </div>
                        <p className="warn">Não é aceito nome de usuário vazio.</p>
                </div>
            </div>
        );
    }
}