const bcrypt = require('bcrypt');

function login(req, res) {
    if (req.session.loggedin != true) {
        res.render('login/index');
    } else {
        res.redirect('/');
    }
}

function auth(req, res) {
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM users WHERE email = ?', [data.email], (err, userdata) => {
            if (userdata.length > 0) {
                userdata.forEach(element => {
                    bcrypt.compare(data.password, element.password, (err, isMatch) => {
                        if (!isMatch) {
                            res.render('login/index', { error: 'Error: ¡Contraseña incorrecta!' });
                        } else {
                            req.session.loggedin = true;
                            req.session.name = element.name;

                            res.redirect('/');
                        }
                    });
                });
            } else {
                res.render('login/index', { error: 'Error: ¡El usuario ya existe!' });
            }

        });
    });
}

//register
function register(req, res) {
    if (req.session.loggedin != true) {
        res.render('login/register');
    } else {
        res.redirect('/');
    }
}

//storeUser
function storeUser(req, res) {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM users WHERE email = ?', [data.email], (err, userdata) => {
            if (userdata.length > 0) {
                res.render('login/register', { error: 'Error: ¡El usuario ya existe!' });
            } else {
                bcrypt.hash(data.password, 12).then(hash => {
                    data.password = hash;
                    req.getConnection((err, conn) => {
                        conn.query('SELECT * FROM users WHERE email = ?', [data], (err, rows) => {

                            req.session.loggedin = true;
                            req.session.name = data.name;

                            res.redirect('/');
                        });
                    });
                });
            }
        });
    });

}


//logout
function logout(req, res) {
    if (req.session.loggedin == true) {
        req.session.destroy();
    } else {
        res.redirect('/login');
    }

}

module.exports = {
    login,
    register,
    storeUser,
    logout,
    auth
}