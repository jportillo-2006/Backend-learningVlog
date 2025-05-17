import { Schema, model } from "mongoose";

const PublicationSchema = Schema({
    title: {
        type: String,
        required: true,
        maxLength: 50
    },
    content: {
        type: String,
        required: true,
        maxLength: 500
    },
    course: {
        type: String,
        required: true,
        enum: {
        values: ['Tecnologia', 'Taller', 'Practica supervisada'],
        message: '{VALUE} no está entre los cursos permitidos: Tecnologia, Taller, Practica supervisada'
        },
        default: 'No definido'
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
});

PublicationSchema.methods.toJSON = function(){
    const { __v, _id, ...publication} = this.toObject();
    publication.uid = _id;
    return publication;
}

export default model('Publication', PublicationSchema);