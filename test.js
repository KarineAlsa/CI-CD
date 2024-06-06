const request = require ('supertest')
const express = require('express');
const { describe } = require('node:test');

const app = express();
app.get('/welcome', (req, res) => {
    res.status(200).send('Hello, world');
});

describe('GET /welcome', () => {
    it ('responds with Hello, world', (done) => {
        request(app)
        .get('/welcome')
        .expect('Hello, world', done);
    });
});
