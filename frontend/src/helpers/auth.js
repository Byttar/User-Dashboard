import jwt from "jsonwebtoken";

export const _isLoggedIn = (_isLogged, _isExpired) => {
    const token = localStorage.getItem("jwt_token");

    let status = false;
    if(token){
        jwt.verify(token, 'f55958e5219ba0b6c1b7259dd4fc8481', (errors, response) => {
            if(response === undefined){
                _isExpired && _isExpired(true);
            }else{ 
                status = true;
            }
        });

        _isLogged && _isLogged(status);
    }

}