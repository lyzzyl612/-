
const orderModal = require("../modal/orderModal.js");
function getOrder1(req,res){
    orderModal.getAllorder().then(function(data){
        res.send({code:200,data:data});
        console.log(data);
    }).catch(function(err){
        console.log(err);
        res.send({code:500});
    });
}
module.exports={
    getOrder1
}