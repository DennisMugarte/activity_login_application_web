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
    res.render('login/register');

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

function registro(req, res) {
    if (req.session.loggedin != true) {
        res.render('login/register');
    } else {
        res.redirect('/');
    }
}

function dato_usuario(req, res) {
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
                            res.redirect('/');
                        });
                    });
                });
            }
        });
    });

}

function cerrar_sesion(req, res) {
    if (req.session.loggedin) {
        req.session.destroy();
    }
    res.redirect('/');
}

module.exports = {
    login,
    registro,
    dato_usuario,

    cerrar_sesion,
    auth
}