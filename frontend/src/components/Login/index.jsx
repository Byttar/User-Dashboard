import React, { useState, useCallback, useEffect } from "react";
import { Container, Form, InputWrap, Input, Button, Errors } from "./style.js";
import multitask from "../../assets/images/multitask.jpg"
import { useForm } from "react-hook-form";
import axios from "axios";
import Toast from "../Toast";
import { Redirect } from "react-router-dom";
import { _isLoggedIn } from "../../helpers/auth";


const Login = () => {  

    const [IsSigningUP, setIsSigningUP] = useState(true);
    const [IsTokenExpired, setIsTokenExpired] = useState(false);
    const [isLogged, setisLogged] = useState(false);
    const { handleSubmit, register } = useForm();
    const [Error, setError] = useState();


    const onSubmit = useCallback(data => {

        var form_data = new FormData();

        for ( var key in data ) {
            if(key === "profile_image"){
                form_data.append("file", data[key][0])
            }else
            form_data.append(key, data[key]);
        }       
            
        if(IsSigningUP){
            axios.post("/user", form_data).then(res => {
                localStorage.setItem("jwt_token", res.data.token);
                setisLogged(true);
            }).catch(err => {
                err.response && alert(err.response.data.message);
            });
        }else{
            axios.post("/login", form_data).then(res => {
                localStorage.setItem("jwt_token", res.data.token);
                setisLogged(true);
            }).catch(err => {
                err.response && alert(err.response.data.message);
            });
        }
    });

    

    return (
        <Container>
            {
                isLogged && <Redirect to="/profile"></Redirect>
            }
            {
                IsTokenExpired && <Toast text="Sua sessão expirou, por favor entre novamente!"/>
            }

            <img src={multitask} alt="MultiTask"></img>
            {
                IsSigningUP ? 
                <Form onSubmit={handleSubmit(onSubmit)}> 
                    <p>
                        Crie sua conta já, é grátis
                    </p>
                    <InputWrap>
                        <Input type="text" name="name" placeholder="Coloque aqui seu nome" ref={register} required/>
                    </InputWrap>
                    <InputWrap>
                        <Input type="password" name="password" placeholder="Uma senha segura" ref={register} required/>        
                    </InputWrap>
                    <InputWrap>
                        <Input type="email" name="email" placeholder="Agora escreva seu email" ref={register} required/>        
                    </InputWrap>
                    <InputWrap>
                        <Input type="text" name="CPF" placeholder="CPF" ref={register} maxLength="11" required/>
                    </InputWrap>
                    <InputWrap>
                        imagem de perfil
                        <Input type="file" name="profile_image" ref={register}/>
                    </InputWrap>
                    <Button>Cadastrar</Button>
                    <a href="#" onClick={() => setIsSigningUP(false)}>Ja possui cadastro?</a>
                </Form> :

                <Form onSubmit={handleSubmit(onSubmit)}>
                    <p>
                        Acesse sua conta
                    </p>
                    <InputWrap>
                        <Input type="text" name="name" placeholder="Login" ref={register} required/>
                    </InputWrap>
                    <InputWrap>
                        <Input type="password" name="password" placeholder="Senha" ref={register} required/>        
                    </InputWrap>
                    <Button>Entrar</Button>
                    <a onClick={() => setIsSigningUP(true)}>Ainda não é cadastrado?</a>
                </Form>
            }
        </Container>
    )
}

export default Login;
