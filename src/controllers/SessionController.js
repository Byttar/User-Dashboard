const jwt = require("jsonwebtoken");
const authCONF = require("../config/auth");
const knex = require("../database/connection");
const auth = require("../config/auth");
const bcrypt = require("bcrypt");
const { cpf } = require('cpf-cnpj-validator');

module.exports = {

    async login(req, res){

        const { name, password } = req.body;
        console.log(req.body);
           
        const user = await knex("user").where("email", "=", name).orWhere("CPF", "=", name).first();

        if(!user)
            return res.status(401).json({error: true, message: "Usuário não encontrado :o"});

        if(!await bcrypt.compare(password, user.password)){
            return res.status(401).json({error: true, message: "Usuário não encontrado :o"});
        }

        const { id, access_level } = user;

        if(access_level === 0){
            return res.status(401).json({error: true, message: "Usuário desativado!"});
        }

        return res.json({
            user,
            token: jwt.sign({id, access_level}, auth.secret, {expiresIn: auth.expiresIn})
        })

    },


    async register(req, res){

        const { name, password, email, CPF } = req.body;

        try {

            if(!cpf.isValid(CPF)){
                throw new Error("CPF invalido!");
            }

            let pass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

            const [id] = await knex('user').insert({
                name,
                password: pass,
                email,
                CPF,
                profile_image: req.file &&req.file.originalname,
                access_level: 1
            });

            return res.json({ 
                token: jwt.sign({id, access_level: 1}, auth.secret, {expiresIn: auth.expiresIn})
             });
             
        }catch(ex){
            return res.status(400).json({error: true, message: ex.message});
        }

    
    }

}