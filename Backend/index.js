import express from 'express';

const app = express();

app.listen(1222, () => {
    console.log('Server is running on port 1222');
});