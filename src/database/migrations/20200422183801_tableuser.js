
exports.up = function(knex) {
    return knex.schema.createTable('user', function(table){
        table.increments('id');
        table.string('name').notNullable();
        table.string('password').notNullable();
        table.string('email').notNullable();
        table.string('CPF').notNullable();
        table.integer('access_level');
        table.string('profile_image');
        table.unique(['CPF']);
      });
    };
    
    exports.down = function(knex) {
      return knex.schema.dropTable('user');
    };
    
