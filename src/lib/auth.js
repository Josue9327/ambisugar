module.exports = {
    isLoggedOut(req, res, next) {
        if(req.isAuthenticated()){
            return next(); 
        }
        return res.redirect('/login');
    },
    isLoggedIn(req, res, next) {
        if(req.isAuthenticated()){
            return res.redirect('/principal'); 
        }
        return next();
    }
};