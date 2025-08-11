const productModel=require('../models/productModel');


//get products api --- api/v1/products
exports.getProducts=async(req,res,next)=>{
     const query=req.query.keyword?{
    name:{
    $regex:req.query.keyword,
    $options:'i'
   }}:{}

   console.log(query);
   
   const products= await productModel.find(query);

    res.json({
        success:true,
        message:'Get products working!',
        products
    })
}

//get single products api --- api/v1/product/:id
exports.getSingleProduct=async(req,res,next)=>{

   // console.log(req.params.id)
  
    try{
        const product=await productModel.findById(req.params.id);
    res.json({
        success:true,
        message:'Get Sinlge product working!',
        product
    })
}
catch(error){
res.status(404).json({
    success:false,
    message:'invalid id'
})
}
}