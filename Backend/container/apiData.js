function data(req, res) {
    const data = req.body;
    
    return data;
    
    // res.json({message : "Data received successfully", data : data});
}

module.exports = data;