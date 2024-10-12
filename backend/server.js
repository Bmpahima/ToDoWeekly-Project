import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";
import cors from 'cors';


dotenv.config();
const db = new pg.Client({
    user: process.env.DB_USER,
    host: "localhost",
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: 5432
});

db.connect();

const port = 3000;
const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); 

app.get('/', async (req, res) => {
    try {
        const results = await db.query("SELECT * FROM tasks");
        res.json(results.rows);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/', async (req, res) => {
    res.redirect('/add');
});

app.get('/add', async (req, res) => {
    const results = await db.query("SELECT * FROM tasks");
    res.json(results.rows);
});

app.post('/add', async (req, res) => {
    try {
        const data = req.body;
        const results = await db.query(
            "INSERT INTO tasks (title, description, submit_date, day) VALUES ($1, $2, $3, $4) RETURNING *",
            [data.title, data.description, data.date, data.weekday]
        );
        res.status(201).json(results.rows[0]); 
    } catch (error) {
        console.error("Error adding task:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.delete('/', async (req, res) => {
    res.redirect('/delete');
});

app.delete('/delete', async (req, res) => {
    try {
        const data = req.body.id;
        const results = await db.query(
            "DELETE FROM tasks WHERE tasks.id = $1 RETURNING *",
            [data]
        );
        res.status(201).json(results.rows[0]);
    } catch (error) {
        console.error("Error delete task:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.patch('/edit', async (req, res) => {
    try {
      const { id, title, description, date, weekday } = req.body;
        if (!id || !title || !description || !date || !weekday) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
      }
      const results = await db.query(
        "UPDATE tasks SET title = $1, description = $2, submit_date = $3, day = $4 WHERE id = $5 RETURNING *",
        [title, description, date, weekday, id]
      );
      if (results.rowCount > 0) {
        res.status(200).json({ success: true, updatedTask: results.rows[0] });
      } else {
        res.status(404).json({ success: false, message: 'Task not found' });
      }
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
