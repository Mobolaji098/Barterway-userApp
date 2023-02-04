const mongoose = require('mongoose');
const prodlocationSchema = new mongoose.Schema({
    name: { type: String },
    longitude: { type: Number },
    latitude: { type: Number }
  });

  const picSchema = new mongoose.Schema({
    profileImage: {
        type: String,
        required: false,
        max: 255
    },
  });
  


const productSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    name: {
        type: String,
        required: 'productname is required',
    },
    images:{
        type: [String],
        required: false,
        max: 255
    },
    weight:{
        type:Number,
        required: true
    },
    awaitingbarter:{
        type: Boolean,
        default: false
    },
    bartered:{
        type: Boolean,
        default: false
    },
    description:{
        type:String,
        required:true
    },
    categories:{
        type:String,
        required: true
    },
    // location: prodlocationSchema,
    itemInReturn:{
        type: String,
        required: 'product to exchange with required',
    },
    location:{
        type:String,
    },

    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    bartercoin:{
        type:Number,
        required: true
    },
    productImages: [picSchema]


}, {timestamps: true});

productSchema.add({location:prodlocationSchema});

module.exports = mongoose.model('Products', productSchema);