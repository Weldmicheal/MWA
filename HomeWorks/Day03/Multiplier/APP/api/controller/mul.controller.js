module.exports.multiply = function(req, res){
    let queryNum = parseInt(req.query.querynum)
    let parNum = req.params.parnum;
    let product = queryNum * parNum
    console.log("queryNum: ", queryNum)
    console.log("parNum: ", parNum)
    console.log("product: ", product)
    res.status(200).json({"result": product})
}