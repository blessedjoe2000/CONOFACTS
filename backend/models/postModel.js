const mongoose = require("mongoose");

//creating post template
const postSchema = mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        
        title: {
        type: String,
        required: true},
        message: {type: String}
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Post', postSchema);