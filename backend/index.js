const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const DB = process.env.DATABASE;
const port = process.env.PORT || 5000

mongoose.set('strictQuery', false);


async function main() {
    await mongoose.connect(DB);
    console.log('connected to database');
    app.listen(port, () => console.log(`Server is live at PORT => ${port}`));
};
main();