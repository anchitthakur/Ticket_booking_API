const app = require('./app');
const port = Number(process.env.PORT) || 9000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})