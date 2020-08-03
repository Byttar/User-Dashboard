import styled from "styled-components";
import bg from "../../assets/images/profile_back.jpeg";

export const Container = styled.div`
    height: 100vh;
    display: flex;
    overflow-x: scroll;
    justify-content: center;
    background: url(${bg});
    background-size: cover;
`

export const Logout = styled.span`
    position: absolute;
    top: 10px;
    right: 10px;
    color: white;
    cursor: pointer;
`

export const Form = styled.form`
    display: flex;
    position: relative;
    border-radius: 8px;
    padding: 4rem 0 0;
    margin: auto 2rem;
    background: #8257e5;
    flex-direction: column;
    justify-content: center;
    width: 400px;
    overflow: hidden;

    & > div {
        background: white;
        border-radius: 0 0 8px 8px;
        border-radius: 8px;
        border: 5px solid #8257e5;
        overflow: hidden;
    }

    button{
        border:0;
        background: orange;
        width: 100%;
        font-family: "Bungee";
        padding: 1rem;
        margin-top: 4rem;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        i{ 
            position: absolute;
            right: 2rem;
        }

        &:hover{
            background: darkorange;
        }

        &.delete{
            margin-top: 0;
            background: red;
        }
    }
`

export const Input = styled.input`
    border: 0;
    width: 100%;
    margin: auto;
    text-align: center;
    border-bottom: 1px white dashed;
    color: white;
    background: transparent;
    font-size: 16px;
    padding: .5rem 0 10px;
    font-family: ${props => props.font};

    &::placeholder{
        color: white;
    }
`

export const InputWrapper = styled.label`
    

    &.photo{
        height: 100%;
        display: flex;
        justify-content: center;
        padding: 1rem 0;

        figure {
            position: relative;
            width: fit-content;
            display: flex;
            align-items: center;
            cursor: pointer;

            img{
            border-radius: 100%;
            height: 150px;
            width: 150px;
            border: white 5px solid;
            object-fit: cover;
        }  
    }

 

        &:hover{
            figure{               
                &::after{
                    content: "Alterar foto";
                    color: white;
                    position: absolute;
                    right: 0;
                    left: 0;
                    text-align: center;
                    font-family: "Bungee";
                    /* border-bottom: 1px solid white; */
                    z-index: 2;
                    cursor: pointer;
                }
                img{
                    filter: brightness(.7);
                }
            }
        }

        input {
            display: none;
        }
    }
    
`