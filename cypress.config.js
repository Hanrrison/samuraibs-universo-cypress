const { defineConfig } = require("cypress");
const { Pool } = require('pg');

module.exports = defineConfig({
  e2e: {
      setupNodeEvents(on, config) {
        // implement node event listeners here

        const pool = new Pool({
          host: 'kesavan.db.elephantsql.com',
          user: 'asagoace',
          password: 'Ty8vlmDonByyIcIwuPMk2NYy96OL9OFx',
          database: 'asagoace',
          port: 5432
        })

        on('task', {
          removeUser(email){
            return new Promise(function(resolve){
              pool.query('DELETE FROM public.users WHERE email = $1', [email], function(error, result){
                if (error) {
                  throw error
                }
                resolve({success: result})
              })
            })
          }
        })

      },

      baseUrl: 'http://localhost:3000',
      viewportWidth: 1440,
      viewportHeight: 900
  },
});
