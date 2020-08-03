import React, {useState, useCallback, useLayoutEffect, useRef} from 'react';
import axios from "axios";
import { Redirect } from "react-router-dom";
import { _isLoggedIn } from "../../helpers/auth";
import { Form, Input, InputWrapper, Container, Logout } from "./style";
import jwt from "jsonwebtoken";
import defaultImg from "../../assets/images/default.png";
import { useForm } from "react-hook-form";
import Toast from "../Toast";

const Profile = () => {
    const token = localStorage.getItem("jwt_token");
    const { handleSubmit, register } = useForm();

    const [userInfo, setUserInfo] = useState({}); 
    const [isLogged, setIsLogged] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    let id;
    jwt.verify(token, 'f55958e5219ba0b6c1b7259dd4fc8481', (errors, response) => {
        if(response) id = response.id;
    });

    const onSubmit = data => {

        var form_data = new FormData();

        for ( var key in data ) {
            if(key === "profile_image"){
                form_data.append("file", data[key][0])
            }else
            form_data.append(key, data[key]);
        }     

        axios.patch("/user/" + id, form_data, {headers: {auth: `Bearer ${token}`}}).then(res => {
            alert("Usuário atualizado com sucesso!");
        });

    };

    const Delete = (e) => {
        e.preventDefault();
        
        if(window.confirm("Tem certeza que quer sair?")){
            localStorage.setItem("jwt_token", "");
            axios.delete("/user/" + id, {headers: {auth: `Bearer ${token}`}}).then(res => {
                alert("Usuário desativado com sucesso!");
                setIsLogged(false);
            });
        }
    }


    const getUserInfo = useCallback(async function(){
        axios.get(`/user/${id}` , {headers: {auth: `Bearer ${token}`}}).then(res => {
            setUserInfo(res.data);
            console.log(res.data);
        }).catch(res => {
            setIsLogged(false);
        });

    }, [setUserInfo]);

    useLayoutEffect(() => {
            getUserInfo();
    }, [getUserInfo]);

    const image = useRef(null);
    const changeImage = (e) => {
        
        if(e.target.files[0]) image.current.src = URL.createObjectURL(e.target.files[0]);
    }

    const logOut = () => {
        if(window.confirm("Tem certeza que quer sair?")){
            localStorage.setItem("jwt_token", "");
            setIsLogged(false)
        }
    }
    
    return <div>
        { !isLogged && <Redirect to="/"></Redirect> }
        <Container>
            <Toast text="Clique nos textos para editar suas informações"/>
            <Form onSubmit={handleSubmit(onSubmit)}> 
                <Logout onClick={logOut}><i className="fas fa-sign-out-alt"></i> Logout</Logout>
                <InputWrapper>
                    <Input font="Bungee" type="text" defaultValue={userInfo.name} name="name" ref={register}/>
                </InputWrapper>
                <InputWrapper className="photo">
                    <figure>
                        <img alt="" src={userInfo.profile_image ? `/media/${userInfo.profile_image}` : defaultImg} ref={image}></img>
                    </figure>
                    <Input type="file" name="profile_image" onChange={changeImage} ref={register}></Input>
                </InputWrapper>
                    <InputWrapper>
                        <Input font="Bungee" type="text" defaultValue={userInfo.email} name="email" ref={register}/>
                    </InputWrapper>
                    <InputWrapper>
                        <Input font="Bungee" type="text" defaultValue={userInfo.CPF} name="CPF" ref={register}/>
                    </InputWrapper>
                    <button type="submit">Atualizar<i className="fas fa-pencil-alt"></i></button>
                    <button onClick={Delete} className="delete" type="submit">Desativar<i className="far fa-times-circle"></i></button>
            </Form>
        </Container>
    </div>;
};

export default Profile;

