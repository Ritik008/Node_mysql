const express = require('express')
const mysql = require('mysql')

// Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
})

// Connect
db.connect((err) => {
    if(err) {
        throw err
    }
    console.log('Mysql connected')
})

const app = express()

// Create database
app.get('/createdb', (req, res)=> {
    let sql = 'create database nodemysql'
    db.query(sql, (err, result)=> {
        if(err) throw err
        console.log(result)
        res.send('database created...')
    })
})

// Create table

app.get('/createpoststable', (req, res) => {
    let sql = 'create table posts(id int AUTO_INCREMENT, title varchar(255), body varchar(255), primary key(id))'
    db.query(sql, (err, result)=> {
        if(err) throw err
        console.log(result)
        res.send('Post table created')
    })
})

// Insert post 1
app.get('/addpost1', (req, res)=> {
    let post = {title: 'Post One', body: 'This is post number one'}
    let sql = 'insert into posts set ?'
    let query = db.query(sql, post ,(err, result)=> {
        if(err) throw err
        console.log(result)
        res.send("Post 1 added...")
    })
})


// Select posts
app.get('/getposts', (req, res)=> {
    let sql = 'Select * from posts'
    let query = db.query(sql, (err, result)=> {
        if(err) throw err
        console.log(result)
        res.send("Posts fetched....")
    })
})

// Select single post
app.get('/getpost/:id', (req, res)=> {
    let sql = `Select * from posts where id = ${req.params.id}`
    let query = db.query(sql, (err, result)=> {
        if(err) throw err
        console.log(result)
        res.send("Post fetched....")
    })
})

// update posts
app.get('/updatepost/:id', (req, res)=> {
    let newTitle = 'updated title'
    let sql = `update posts set title = '${newTitle}' where id = ${req.params.id}`
    let query = db.query(sql, (err, result)=> {
        if(err) throw err
        console.log(result)
        res.send("Posts updated....")
    })
})


app.listen(3000, () => {
    console.log("Server is up at port 3000")
})