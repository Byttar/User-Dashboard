import React, {useState, useCallback, useLayoutEffect, useRef} from 'react';
import axios from "axios";
import { Redirect } from "react-router-dom";
import { _isLoggedIn } from "../../helpers/auth";
import { Form, Input, InputWrapper, Container, Logout } from "../Profile/style";
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
;

    const getUserInfo = useCallback(async function(){
        axios.get(`/user/` , {headers: {auth: `Bearer ${token}`}}).then(res => {
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
        
        image.current.src = URL.createObjectURL(e.target.files[0]);
    }

    const logOut = () => {
        if(window.confirm("Tem certeza que quer sair?")){
            localStorage.setItem("jwt_token", "");
            window.location.reload();
        }
    }

    const onSubmit = data => {

        var form_data = new FormData();

        for ( var key in data ) {
            if(key === "profile_image"){
                form_data.append("file", data[key][0])
            }else
            form_data.append(key, data[key]);
        }     

        axios.patch("/user/" + data.id, form_data, {headers: {auth: `Bearer ${token}`}}).then(res => {
            alert("Usuário atualizado com sucesso!");
        });

    };

    const Delete = (id) => {
        
        if(window.confirm("Tem certeza que quer desativar este usuário?")){
            axios.delete("/user/" + id, {headers: {auth: `Bearer ${token}`}}).then(res => {
                alert("Usuário desativado com sucesso!");
            });
        }
    }
    

    return <Container style={{inlineSize: "max-content"}}>
        { !isLogged && <Redirect to="/"></Redirect> }
        {
          userInfo.map && userInfo.map(user => {
              return (
                <Form onSubmit={handleSubmit(onSubmit)}> 
                    {/* <Logout onClick={logOut}><i className="fas fa-sign-out-alt"></i> Logout</Logout> */}
                    <InputWrapper>
                        <Input font="Bungee" type="text" defaultValue={user.name} name="name" ref={register}/>
                    </InputWrapper>
                    <InputWrapper className="photo">
                        <figure>
                            <img alt="" src={user.profile_image ? `/media/${user.profile_image}` : defaultImg} ref={image}></img>
                        </figure>
                        <Input type="file" name="profile_image" onChange={changeImage} ref={register}></Input>
                    </InputWrapper>
                    <InputWrapper>
                        <Input font="Bungee" type="text" defaultValue={user.email} name="email" ref={register}/>
                    </InputWrapper>
                    <InputWrapper>
                        <Input font="Bungee" type="text" defaultValue={user.CPF} name="CPF" ref={register}/>
                    </InputWrapper>
                    <InputWrapper>
                        <Input font="Bungee" type="text"  placeholder="Nova Senha" name="password" ref={register}/>
                    </InputWrapper>
                    <Input type="hidden" defaultValue={user.id} name="id" ref={register}/>
                    <button type="submit">Atualizar<i className="fas fa-pencil-alt"></i></button>
                    <button onClick={(e) => {e.preventDefault(); return Delete(user.id)}} className="delete" type="submit">Desativar<i className="far fa-times-circle"></i></button>
                </Form>
              )
          })
        }
    </Container>;
};

export default Profile;

