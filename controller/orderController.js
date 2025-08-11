const orderModel=require('../models/orderModel');
const productModel=require('../models/productModel')

//create order --api/vi/order
exports.createOrder=async(req,res,next)=>{

    const cartItems=req.body;  
      
    const amount=cartItems.reduce((acc,item)=>
        
        Number(acc+(item.product.price * item.qty)).toFixed(2),0) ;

    const status='pending'; 
    
   const order= await orderModel.create({cartItems,amount,status})
   
    // updating product stock
    console.log(cartItems);
    
    cartItems.forEach(async(item) => {
        console.log(item.product._id,'item id');
        
       const product= await productModel.findById(item.product._id);
       
      // console.log(product, 'helloproduct');
       //console.log(Number(product.stock)-Number(item.qty));
       
        product.stock=Number(product.stock)-Number(item.qty);
        
       await product.save();
    });
   
   
   res.json({
        success:true,
        message:"order works !!",
        order
    })
}