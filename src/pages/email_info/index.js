import { Component } from "react";
import api from '../../api';
import './style.css';
import { Link } from 'react-router-dom';

export default class Email extends Component{
    state= {
        destinatario: '',
        remetente: '',
        assunto: '',
        corpo: '',
        isremetente: false
    };

    async componentDidMount(){
        const { id } = this.props.match.params;
        const response = await api.get('/email/id=' + id);
        
        if (response.data.length !== 0){
            const { destinatario, remetente, assunto, corpo, isremetente } = response.data[0];
    
            this.setState({destinatario: destinatario, remetente: remetente, assunto: assunto, corpo: corpo, isremetente: isremetente});
        }

    }

    deleteEmail = async () => {
        const { id } = this.props.match.params;
        api.delete('/delete/id=' + id)
        .then( response => {
            alert("Email excluido com sucesso!");
        })
        .catch(error => {
            alert("Não foi possível excluir o email, tente novamente.");
        })
    }
    
    render(){
        const { destinatario, remetente, assunto, corpo, isremetente } = this.state;
        const { username } = this.props.match.params;
        const cp = corpo
        return(
            <div className="email_info">

                <h3>Informação do Email</h3>

                <input type="text" 
                        name="remetente" 
                        placeholder="Remetente" 
                        className="input_area" 
                        value={`De: ${remetente}`} 
                        disabled/>
                
                    <input type="text" name="destinatario" placeholder="Destinatário" className="input_area" value={`Para: ${destinatario}`} disabled/>

                    <input type="text" name="assunto" placeholder="Assunto" className="input_area" value={`Assunto: ${assunto}`} disabled/>

                    <textarea name="corpo" id="" cols="30" rows="10" placeholder=" Digite o corpo aqui..." value={corpo} disabled></textarea>

                    <Link to={`/user/${username}/`}>
                        <button className="delete_email" onClick={this.deleteEmail}>Excluir Email</button>
                    </Link>

                    <Link to={{
                        pathname: `/user/${username}/sendmail`,
                        state: {
                            corpo: cp,
                            assunto: assunto,
                            encaminhar: true
                        }
                    }}>
                        <button className="delete_email">Encaminhar Email</button>
                    </Link>

                    <Link to={{
                        pathname: `/user/${username}/sendmail`,
                        state: {
                            assunto: assunto,
                            destinatario: destinatario,
                            remetente: remetente,
                            responder: true,
                            isremetente: isremetente
                        }
                    }}>
                        <button className="delete_email">Responder Email</button>
                    </Link>

                    <Link to={`/user/${username}/`}>
                        <button className="delete_email">Voltar</button>
                    </Link>

            </div>
        );
    }
}