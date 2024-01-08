import { openDb } from './db.js' 

async function setup() {
  // Open SQLite connection
  const db = await openDb()

  // Define table schema
  await db.exec(`
    CREATE TABLE conversation (
      id INTEGER PRIMARY KEY AUTOINCREMENT,  
      role TEXT,
      message TEXT  
    );
  `)

  // Insert dummy data
  await db.run(
    'INSERT INTO conversation (role, message) VALUES (?, ?)',
    'User', 
    'Hello!'
  )
  
  // Close connection
  await db.close()  
}

setup()
  .catch(err => {
    console.error(err.message)
  }) 