// db.js
const mongoose = require("mongoose");

// Замените URI подключения на ваш URI MongoDB Atlas
mongoose.connect("mongodb+srv://Lida:oayjqe2005@cluster0.mongodb.net/test21", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;
