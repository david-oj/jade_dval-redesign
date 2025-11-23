// user post their name =>> "TINUADE"
// on the backend you are expecting a lowercase ->> "tinuade"
// middleware to convert the name to lowercase.
// name.toLowerCase()
// usage: app.use(lowercaseNameMiddleware);

// req = request object
// res = response object
// next = function to pass control to the next middleware
// register -> app.use(lowercaseNameMiddleware) => app.use('login', loginRoute)
// 

// function lowercaseNameMiddleware(req, res, next) {

// }