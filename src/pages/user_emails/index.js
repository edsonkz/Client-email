import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import './style.css';

export default class UserEmails extends Component{
    state={
        emails: [],
        enviados: [],
        recebidos: []
    }

    async componentDidMount(){
        const { username } = this.props.match.params;
        const response = await api.get('/user=' + username);
        const env = [];
        const rec = [];

        response.data.map(email => {
            if (email.remetente === username && email.isremetente){
                env.push(email);

            } else if(email.destinatario === username && !email.isremetente){
                rec.push(email);
            } 
        });


        this.setState({emails: response.data, enviados: env, recebidos: rec});
    }

    render(){
        const { enviados, recebidos } = this.state;
        const { username } = this.props.match.params;

        return(
            <div className="emails_list">
                <h2>Seja bem vindo {username}!</h2>
                <div className="emails_sended">
                    <h3 className='email_type'>Emails enviados</h3>
                    {enviados.length !== 0? (
                        <div className="emails">
                            {enviados.map(email => (
                                <div key={email.id} className="email">
                                <Link to={`/user/${username}/${email.id}`} className="link_to">
                                    <p className="r_name">
                                        <label className="email_label">
                                            <strong>remetente </strong>  
                                        </label>
                                        {email.remetente}
                                    </p>
                                    <p className="d_name">
                                        <label className="email_label">
                                            <strong>destinatário </strong>  
                                        </label>
                                        {email.destinatario}</p>
                                    <p className="assunto">
                                        <label className="email_label">
                                            <strong>assunto </strong>  
                                        </label>
                                        {email.assunto}</p>
                                </Link>    
                            </div>
                            ))}
                        </div>
                    ) : (
                        <p>Nenhum email enviado.</p>
                    )}
                </div>

                <div className="emails_received">
                    <h3 className='email_type'>Emails recebidos</h3>
                    {recebidos.length !== 0? (
                        <div className="emails">
                            {recebidos.map(email => (
                                <div key={email.id} className="email">
                                    <Link to={`/user/${username}/${email.id}`} className="link_to">
                                        <p className="r_name">
                                            <label className="email_label">
                                                <strong>remetente </strong>  
                                            </label>
                                            {email.remetente}
                                        </p>
                                        <p className="d_name">
                                            <label className="email_label">
                                                <strong>destinatário </strong>  
                                            </label>
                                            {email.destinatario}</p>
                                        <p className="assunto">
                                            <label className="email_label">
                                                <strong>assunto </strong>  
                                            </label>
                                            {email.assunto}</p>
                                    </Link>    
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Nenhum email recebido.</p>
                    )}
                </div>
                
                <Link className="send_email" to={
                    `/user/${username}/sendmail`
                }>Enviar Email</Link>

                <Link className="send_email" to={
                    `/`
                }>Voltar</Link>
                
            </div>
        );
    }

}