const PORT = require('./utils/constants').PORT;
const app = require('./app');

// start server
app.listen(PORT , () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})