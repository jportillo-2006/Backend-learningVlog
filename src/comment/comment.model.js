import { Schema, model } from "mongoose";

const CommentSchema = Schema({
    name: {
        type: String,
        required: true,
        maxLength: 12
    },   
    content: {
        type: String,
        required: true,
        maxLength: 75
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
});

CommentSchema.methods.toJSON = function(){
    const { __v, _id, ...comment} = this.toObject();
    comment.uid = _id;
    return comment;
}

export default model('Comment', CommentSchema);