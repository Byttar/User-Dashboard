const bcrypt = require("bcrypt");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {id: 1, name: 'admin', password: bcrypt.hashSync("admin@123", bcrypt.genSaltSync(10)), email: "admin@admin.com.br", CPF: "71361094001", access_level: 999, profile_image: ""},
      ]);
    });
};
