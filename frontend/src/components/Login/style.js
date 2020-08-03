import styled, {keyframes} from "styled-components";

export const Container = styled.section`
    height: 100%;
    display: flex;
    justify-content: center;
    position: fixed;
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;
    flex-wrap: wrap;
    align-items: center;
`

export const Form = styled.form`
    width: 500px;
    padding: 1rem;
    font-family: "Bungee";
    font-size: 32px;
    text-align: center;

    a {
        font-size: 12px;
        text-transform: uppercase;
        border-bottom: 1px black solid;
        font-family: roboto;
        cursor: pointer;
    }
`

export const Button = styled.button`
    border: 0;
    padding: .5rem 2rem;
    margin: 10px 0;
    font-family: "Roboto";
    text-transform: uppercase;
    font-weight: 1000;
    background-color: #23406c;
    color: white;
    border-radius: 5px;
    width: 100%;
    font-size: 15px;
    transition: background .2s;

    &:hover{
        background-color: #3c64a2;
    }
`

export const Errors = styled.div`
`

export const InputWrap = styled.label`
    /* display: block; */
    font-size: 12px;
    display: flex;
    margin: 10px 0;
    align-items: center;
    
`

export const Input = styled.input`
    padding: .5rem;
    width: 100%;
    transition: box-shadow .1s ease-in; 
    border: 0;
    border: 1px solid #eaeaea;
    border-radius: 5px;
    /* border-radius: 10px; */

    &:focus{
        box-shadow: 0 0 5px 0px #a3b2ff;

    }
`


