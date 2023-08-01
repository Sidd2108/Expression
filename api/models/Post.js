const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    content: String,
    photos: [String],
    postedAt: Date

})

const PostModel = mongoose.model("Post", PostSchema);

module.exports = PostModel;