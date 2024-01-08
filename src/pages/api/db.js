import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// Open SQLite database connection
export async function openDb() {
  return open({
    filename: './src/backend/data.db',
    driver: sqlite3.Database
  })  
}