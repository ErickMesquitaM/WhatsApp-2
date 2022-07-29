
module.exports = (req, res) => {

    let token = req.header("userToken")

    res.send( token )
}