const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Daman');
}

const userSchema = new mongoose.Schema({
    // email : String,
    password : {
      type : String,
      require : true
    },
    mobile : {
      type : Number,
      require : true
    }
})

const User = new mongoose.model("User", userSchema);

module.exports = User;