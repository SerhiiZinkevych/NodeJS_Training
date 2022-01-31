const app = require('./app');
const value = require('./a');

console.log(value);

const port = 3000;

app.listen(port, () => {
    console.log(`Server running. Use our API on port: ${port}`);
});
