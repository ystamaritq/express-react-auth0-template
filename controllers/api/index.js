const router = require("express").Router();
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

// placeholder exampleRoutes
const exampleRoutes = require("./example");

const audience = process.env.AUTH0_AUDIENCE;
const issuer = process.env.AUTH0_ISSUER;

if (!issuer || !audience) {
	throw new Error("Please make sure that .env is in place and populated");
}

// setup jwt with auth0
const jwtCheck = jwt({
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 100,
		jwksUri: `${issuer}.well-known/jwks.json`,
	}),
	audience: audience,
	issuer: issuer,
	algorithms: ["RS256"],
});

// api routes must to be place here, add jwtCheck as a second parameter to require authentication in the api routes as well
router.use("/example", jwtCheck, exampleRoutes);

// placeholder for unauthenticated apis without jwtCheck as a second parameter
// router.use("/name", nameRoute);

module.exports = router;
