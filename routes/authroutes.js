var jwt = require('jsonwebtoken');
var multer = require('multer')
var upload = multer();

module.exports = function(app) {


	/* Set headers (CORS) */
	app.use(function(req, res, next) { 
		res.header('Access-Control-Allow-Origin', "*"); 
		res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE, OPTIONS'); 
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
		
		if (req.method === 'OPTIONS') {
        	return res.end();
    	} 
		next();
	})

    /* Provide token */
    app.post('/authenticate', upload.array(), function(req, res) {
        if (req.body.password == process.env.PASSWORD) {
            var token = jwt.sign({
                role: "admin"
            }, process.env.SECRET, {
                expiresIn: '1h'
            });

            res.json({
                success: true,
                message: 'Enjoy your token!',
                token: token
            });
        } else {
            res.json({
                info: 'wrong password'
            })
        }
    })

    /* Auth Middleware */
    app.use(function(req, res, next) {
        if (req.method == "GET") {
            next();
        } else {
        	console.log("nu hier")
        	console.log(req.headers)
            var token = req.headers.token;

            if (token) {

                jwt.verify(token, process.env.SECRET, function(err, decoded) {
                    if (err) {
                        return res.json({
                            success: false,
                            message: 'Failed to authenticate token.',
                            info: err
                        });
                    } else {
                        next();
                    }
                });

            } else {

                return res.status(403).send({
                    success: false,
                    message: 'No token provided.'
                });

            }
        }
    })

}
