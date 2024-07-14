const pg = require('pg');

const { Pool } = pg;

const Connectdb = () => {

    const pool = new Pool({
        connectionString: process.env.POSTGRES_URL,
      })
      
      pool.connect((err: any)=>{
      
          if (err) {
              console.error('Error connecting to the database:', err.stack)
          } else {
              console.log('Connected to the database!')
          }
      
      })
}

export default Connectdb