import mongoose from 'mongoose';

const whatsappSchema = ({
    message : String,
    name : String,
    timestamp : String,
    receive: Boolean
});

export default mongoose.model( 'messagecontents', whatsappSchema );