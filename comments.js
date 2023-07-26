// Create web server
// 1. Create a web server
// 2. Create a route for GET /comments
// 3. Create a route for GET /comments/:id
// 4. Create a route for POST /comments
// 5. Create a route for PUT /comments/:id
// 6. Create a route for DELETE /comments/:id
// 7. Create a route for GET /comments/:id/like
// 8. Create a route for GET /comments/:id/dislike
// 9. Create a route for GET /comments/:id/abuse

// 1. Create a web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const comments = require('./comments.json');

// 2. Create a route for GET /comments
app.use(bodyParser.json());
app.get('/comments', (req, res) => {
    res.json(comments);
});

// 3. Create a route for GET /comments/:id
app.get('/comments/:id', (req, res) => {
    const comment = comments.find(comment => comment.id === Number(req.params.id));
    res.json(comment);
});

// 4. Create a route for POST /comments
app.post('/comments', (req, res) => {
    const comment = {
        id: comments.length + 1,
        body: req.body.body,
        postId: req.body.postId
    };
    comments.push(comment);
    res.json(comment);
});

// 5. Create a route for PUT /comments/:id
app.put('/comments/:id', (req, res) => {
    const comment = comments.find(comment => comment.id === Number(req.params.id));
    comment.body = req.body.body;
    comment.postId = req.body.postId;
    res.json(comment);
});

// 6. Create a route for DELETE /comments/:id
app.delete('/comments/:id', (req, res) => {
    const comment = comments.find(comment => comment.id === Number(req.params.id));
    const index = comments.indexOf(comment);
    comments.splice(index, 1);
    res.json(comment);
});

// 7. Create a route for GET /comments/:id/like
app.get('/comments/:id/like', (req, res) => {
    const comment = comments.find(comment => comment.id === Number(req.params.id));
    comment.likes++;
