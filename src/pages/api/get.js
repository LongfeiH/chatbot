import { openDb } from './db.js'

export default async function handler(req, res) {
  const { tableName } = req.body;

  try {
    const db = await openDb();
    const posts = await db.all(`SELECT * FROM ${tableName}`);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
