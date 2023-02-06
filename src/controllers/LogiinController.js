function login(req, res) {
    req.render('login/index');
}

function login(req, res) {
    req.render('login/register');
}

module.exports = {
    login: login,
    register: register,
}