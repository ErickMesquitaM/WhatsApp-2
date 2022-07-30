

module.exports = {

    new: (req, res) => {
        res.send('recebeu um "post" do servidor')
    },

    view: (req, res) => {
        res.render("newRoom")
    }

}