const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    address:{
        
        latitude:{
            type:Number
        },
        longitude:{
            type:Number
        }
    
            
    },
    mobile:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cart:{
        items:[
            {
                name:{
                    type:String,
                    required:true
                },
                quantity:{
                    type:Number,
                    required:false
                },
                price:{
                    type:Number,
                    required:true
                }
            }
        ]
    }
});

module.exports = mongoose.model('User',userSchema);