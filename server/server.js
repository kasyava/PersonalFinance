const app = require('./app/app')
const config = require("./config");
const port = config.PORT || '3000'

app.listen(port, () => {
    console.log(`Server started on ${port} port!`)
});