const { Schema, model, default: mongoose } = require('mongoose');

const pollSchema = new Schema({
    pollType: {
        type: String,
        enum: ['multichoice', 'ranking', 'rating', 'numeric', 'text'],
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    options: [
        {
            text: String,
            votes: {
                type: Number,
                default: 0,
            },
        },
    ],
    createdBy: {
        type: Schema.Types.ObjectId,
        refPath: 'createdByType',
    },
    createdByType: {
        type: String,
        enum: ['Owner', 'Tenante'],
    }
   
},{timestamps:true});

const Poll = model('Poll', pollSchema);
module.exports=Poll