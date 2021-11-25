const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    SPIN:{
        type:String,
        required:true
    },
    Dairy:[{
        name:{type:String},
        price:{type:Number},
        image:{type:String}
    }],
    Snacks:[{
        name:{type:String},
        price:{type:Number},
        image:{type:String}
    }],
    Vegetables:[{
        name:{type:String},
        price:{type:Number},
        image:{type:String}
    }],
    Fruits:[{
        name:{type:String},
        price:{type:Number},
        image:{type:String}
    }],
    Beverages:[{
        name:{type:String},
        price:{type:Number},
        image:{type:String}
    }]
})

module.exports = mongoose.model('Item',itemSchema);