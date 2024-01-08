import { openDb } from './db.js'

export default async function handler(req, res) {

  // Get post data from request body  
  const { tableName, role, message } = req.body

  // Insert post into database
  try {
    const db = await openDb();
    const result = await db.run(
      `INSERT INTO ${tableName} (role, message) VALUES (?, ?)`, 
      [role, message]
    )
    await db.close()
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
