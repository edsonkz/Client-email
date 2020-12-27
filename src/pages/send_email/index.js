import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import './style.css';

export default class SendEmail extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            remetente: '',
            destinatario: '',
            assunto: '',
            corpo: '',
            encaminhar: false,
            responder: false,
            isremetente: false
        };

    }

    componentDidMount(){
        const {username} = this.props.match.params;
        const test = this.props.location.state;
        const responder = this.props.location.state;
        
        if(test !== undefined && test.encaminhar){
            this.setState({remetente: username, encaminhar: test.encaminhar, assunto: test.assunto, corpo: test.corpo});
        } else if (responder !== undefined && test.responder){
            if(!test.isremetente){
                this.setState({remetente: username, destinatario: responder.remetente, responder: responder.responder, assunto: `Re: ${responder.assunto}`, corpo: responder.corpo}); 
            } else {
                this.setState({remetente: username, destinatario: responder.destinatario, responder: responder.responder, assunto: `Re: ${responder.assunto}`, corpo: responder.corpo});
            }
        } else {
            this.setState({remetente: username});
        }
    }
    
    changeHandler = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    submitHandler = event => {
        event.preventDefault();
        api.post('/create', this.state)
        .then( response => {
            alert("Email enviado com sucesso!");
        })
        .catch(error => {
            alert("Não foi possível enviar o email, tente novamente.");
            console.log("Erro no envio!");
        })
    }

    render(){
        const {username} = this.props.match.params;
        const {destinatario,responder, encaminhar, assunto, corpo} = this.state;
       
        return(
            <div className="create_email">
                <h2>Enviar Email</h2>
                <form onSubmit={this.submitHandler}>
                    <input type="text" 
                        name="remetente" 
                        placeholder="Remetente" 
                        className="input_area" 
                        value={`De ${username}`} 
                        onChange={this.changeHandler} 
                        disabled/>

                    {responder? (
                        <input type="text" name="destinatario" placeholder="Destinatário" className="input_area" value={`${destinatario}`} disabled required/>
                    ): (
                        <input type="text" name="destinatario" placeholder="Destinatário" className="input_area" onChange={this.changeHandler} required/>
                    )}

                    {encaminhar? (
                        <input type="text" name="assunto" placeholder="Assunto" className="input_area" value={assunto} disabled required/>
                    ) : (responder? (
                        <input type="text" name="assunto" placeholder="Assunto" className="input_area" value={assunto} disabled required/>
                    ): (
                        <input type="text" name="assunto" placeholder="Assunto" className="input_area" onChange={this.changeHandler} required/>
                    )
                    )}
                    
                    {encaminhar? (
                        <textarea name="corpo" id="" cols="30" rows="10" placeholder=" Digite o corpo aqui..." value={corpo} disabled required></textarea>
                    ) : (
                        <textarea name="corpo" id="" cols="30" rows="10" placeholder=" Digite o corpo aqui..." onChange={this.changeHandler} required>
                        </textarea>
                    )}

                    <button type="submit" className="button_submit">Enviar Email</button>
                    <Link to={`/user/${username}/`} className="button_submit"> Voltar</Link>
                </form>
            </div>
        );
    }
}