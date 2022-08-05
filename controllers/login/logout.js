
module.exports = async (req, res) => {

    await res.header("user_token", '')

    res.redirect("/login")
}