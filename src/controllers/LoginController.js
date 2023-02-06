const bcrypt = require('bcrypt');

function login(req, res) {
    if (req.session.loggedin) {
        res.redirect('/');
    } else {
        res.render('login/index');
    }
}

function auth(req, res) {
    const data = req.body;
    res.render('login/register');

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM users WHERE email = ?', [data.email], (err, userdata) => {
            if (userdata.length > 0) {
                bcrypt.compare(data.password, userdata.password, (err, isMatcg) => {
                    if (!isMatch) {
                        res.render('login/index', { error: 'Error: ¡Contraseña incorrecta!' });
                    } else {
                        console.log('¡Bienvenido!');
                    }
                })
            } else {
                res.render('login/index', { error: 'Error: ¡El usuario ya existe!' });
            }
        });
    });
}

function registro(req, res) {
    res.render('login/register');
}

function dato_usuario(req, res) {
    // let email = req.body.email;
    // let password = req.body.password;

    // req.getConnection((err, conn) => {
    //     conn.query('SELECT * FROM users WHERE email = ?', [email], (err, rows) => {
    //         if (rows.length > 0) {
    //             console.log(rows);
    //         } else {
    //             console.log('not');
    //         }

    //     });
    // });

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