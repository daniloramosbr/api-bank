import pg from 'pg';

const { Pool } = pg;

const ConnectDb = () => {

    const pool = new Pool({
        connectionString: process.env.POSTGRES_URL,
      })
      
      pool.connect((err)=>{
      
          if (err) {
              console.error('Error connecting to the database:', err.stack)
          } else {
              console.log('Connected to the database!')
          }
      
      })
}

export default ConnectDb;