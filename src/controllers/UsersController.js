const knex = require("../database/connection");
const bcrypt = require("bcrypt");

module.exports = {
    
    async index(req, res){
    
        const id = req.tokenID;
        const user = await knex.select("access_level").from("user").where("id", id).first();
        if(user.access_level !== 999) return res.status(401).json({error: true, message: "unauthorized! >:("})

        const users = await knex('user').select('*');

        return res.json(users);   
        
    },

    async find(req, res){

        try{
            const user = await knex.select('name', 'email', 'cpf', 'profile_image').from("user").where("id", "=", req.params.id).first();
            if(user.length == 0) return res.json({message: "User not found!"});
            return res.json(user);   

            }catch(ex){
            return res.status(400).json({error: true, message: ex.message})
        }
    
    },

    async patch(req, res){
       

        const { name, email, CPF } = req.body;

        try{
            await knex("user").where("id", "=", req.params.id).update({
                name,
                email,
                CPF,
                profile_image: req.file ? req.file.originalname : undefined,
            });

            res.status(200).json({message: "it worked"});


        }catch(ex){

            res.json({error: true, message: ex.message});
        }        
    
    },

    async purge(req, res){

        try{

            await knex("user").where("id", "=", req.params.id).update({
                access_level: 0
            });

        }catch(ex){

            res.json({error: true, message: ex.message});
        }

        res.status(200).json({message: "it worked"});
    
    }
}