const Products = require('../models/product');
const {uploadFiles} = require('../../src/utils/index');

// @route GET api/product
// @desc Show all products
// @access Public
exports.index = async (req, res) => {
    const products = await Products.find({});
    res.status(200).json({products});
};
// @route POST api/product/store
// @desc Add product
// @access Public
exports.store = async (req, res) => {
    try {
        if (req.files[0]){
    
        //Attempt to upload product image to cloudinary
        const result = await uploadFiles(req.files);
        //Make sure all parameters are added
        const {name,weight,description,categories,itemInReturn,bartercoin } = req.body;
        let productPayload={
                userId:req.user._id,
                name:name,
                weight:weight,
                description:description,
                categories:categories,
                itemInReturn:itemInReturn,
                bartercoin:bartercoin,
                images: result,
    
            }; 
            const newProduct = new Products(productPayload);
            await newProduct.save();

        return res.status(200).json({newProduct,message: 'Product Added for ' + req.user.userName + '.'})}
        if (!req.files[0]){ 
            res.status(500).json({success: false, message: "product does not have an image"})
            }
        
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
};


// @route PUT api/product/{userId}/{productId}
// @desc update product
// @access Public
exports.update = async (req, res) => {
    try {
        const productId = req.params.productId
        const userId = req.params.userId
        const {name,weight,description,categories,itemInReturn,location,bartercoin } = req.body;

        // Check if the user owns the product
        Products.find({_id:productId,userId:userId }, async (error,product) => {
            if (product[0]) {
                let productPayload={
                    userId:req.user._id,
                    name:name,
                    weight:weight,
                    description:description,
                    categories:categories,
                    itemInReturn:itemInReturn,
                    location:location,
                    bartercoin:bartercoin
                };
        
                const product = await Products.findByIdAndUpdate(productId, {$set: productPayload}, {new: true});
            

        res.status(200).json({product, message: 'Product has been updated'});
            } 
        else{
            res.status(500).json({success: false, message: "product not available or user does not have permission"})
        }
          });
      

    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
};


// @route GET api/product/{userId}
// @desc Returns a specific user products
// @access Public
exports.show = async function (req, res) {
    try {
        const id = req.params.userId;
        const products = await Products.find({userId: id});
        console.log("") 

        if (!products) return res.status(401).json({message: 'User does not exist'});

        res.status(200).json({products});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

// @route GET api/product/{userId}/{category}
// @desc Returns other users products by category
// @access Public

exports.category = async function (req, res) {
    try {
        //Exclude the users products
        const excludedId = req.params.userId;
        
        const category = req.params.category
        const products = await Products.find({userId: { $ne: excludedId }, categories: { $eq: category }});
        
        if (!products) return res.status(401).json({message: 'User does not exist'});

        res.status(200).json({products});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

// @route PUT api/product/loc/{productId}
// @desc Update product location details from front-end
// @access Public
exports.updateloc = async function (req, res) {
    try {
        const update = req.body;
        const productId = req.params.productId;
        const userId = req.user._id;
        

// Check if the user owns the product
         Products.find({_id:productId,userId:userId }, async (error,product) => {
             if (product[0]) {
            const prod = await Products.findByIdAndUpdate(productId, {$set: {location:update}}, {new: true});
            res.status(200).json({prod, message: 'Product has been updated'});
             }
        else{
         res.status(500).json({success: false, message: "product not available or user does not have permission"})
         }
           });
      

    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
};



// @route DESTROY api/product/{productID}
// @desc Delete product
// @access Public
exports.destroy = async function (req, res) {
    try {
        const productId = req.params.productId;

         await Products.findByIdAndDelete(productId);

        res.status(200).json({message: 'product has been deleted'});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};
