const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Cannot b Blabk']
    },
    password:{
        type: String,
        required: [true, 'Cannot b Blabk']
    }
})

const User = new mongoose.model('User', userSchema);

module.exports = User

