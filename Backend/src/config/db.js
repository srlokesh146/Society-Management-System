const { default: mongoose } = require("mongoose");
const constant = require("./constant");

exports.db=mongoose.connect(constant.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
})