const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pointSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  });

const storeSchema = new Schema({
    place:{
        type:String,
        require:true
    },
    // geometry:{
    //     coordinates:{type:[Number],index:'2dsphere',require:true}
    // },
    location: {
        type: pointSchema,
        index: '2dsphere' // Create a special 2dsphere index on `City.location`
    },
    products:{
        dairy:[
            {
                name:{type:String},
                price:{type:Number}
            }
        ],
        vegetables:[
            {
                name:{type:String},
                price:{type:Number}
            }
        ],
        snacks:[
            {
                name:{type:String},
                price:{type:Number}
            }
        ],
        fruits:[
            {
                name:{type:String},
                price:{type:Number}
            }
        ]
    },
    storePIN:{
        type:String,
        require:true
    },
    rating:{
        type:Number,
        require:true
    }
})

storeSchema.index({ location: '2dsphere' });
module.exports = mongoose.model('Store',storeSchema);