const express = require('express');
let mysql = require('mysql2');
const app = express();
const PORT = 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/mahasiswa',(req, res )=> {
    res.send('Hello World');
});

app.listen(PORT,() =>{
    console.log(`server is running on port ${PORT}`);
});

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tegar0811',
    database: 'biodata',
    port: 3308
});

db.connect((err) =>{
    if (err){
        console.error('Error connecting to MySQL:' + err.stack);
        return;


    }
    console.log('Connection Succuessfully!');
});


app.get('/mahasiswa', (req, res) => {
    const sql = 'SELECT * FROM mahasiswa';      
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error executing query: ' + err.stack);
        res.status(500).send('Error executing query');
        return;
      }
      res.json(results);
    });
});

app.post('/mahasiswa', (req, res) => {
    const { id, nama, nim, kelas, prodi } = req.body;
    const sql = 'INSERT INTO mahasiswa (id, nama, nim, kelas, prodi) VALUES (?, ?, ?, ?, ?)';      
    db.query(sql, [id, nama, nim, kelas, prodi], (err, results) => {
      if (err) {
        console.error('Error executing query: ' + err.stack);
        res.status(500).send('Error executing query');
        return;
      } 
      res.status(201).json({ id: results.insertid, nama, nim, kelas, prodi });
    });
});