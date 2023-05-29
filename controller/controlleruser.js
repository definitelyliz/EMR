var User = require('../model/user');
//var Post = require('../model/post');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const controllerUser = {

    login: async (req, res) => {
        if (!req.session.username) {
            console.log(req.session.username);
            var message = false
            res.render('user/login', { message });
        }
        else {
            // tried to place rendering of login page everytime user changes details
            console.log('bruh');
            // res.redirect(`/user/${req.session.username}`)
            var message = false
            res.render('user/login', { message });
        }
    },


    checkLogin: async (req, res) => {
        message = '';
        var check;
        var data = req.query;
        var user = await User.findOne({ username: req.body.username })
            .then(async (check) => {
                var user = await User.findOne({ username: req.body.username });
                if (user.username === req.body.username) {

                    bcrypt.compare(req.body.password, user.password, async function (err, isMatch) {
                        if (!isMatch) {
                            var message = true;
                            res.render('user/login', { message });
                        }
                        else {
                            req.session.username = req.body.username;
                            var currentUser = await User.findOne({ 'username': req.session.username });
                            res.redirect('/');
                        }
                    })
                }
            })
            .catch(() => {
                message = 'No user found.';
                console.log('No user found');
                var message = true;
                res.render('user/login', { message });
            });
    },

    userPage: async (req, res) => {
        if (req.session.username) {
            var { username } = req.params;
            var currentUser = await User.findOne({ 'username': username });
            if (currentUser) {
                res.render('user/userPage', { currentUser });
            }
            else {
                res.redirect('/user/signup');
            }
        }
        else {
            message = 'Login to proceed.';
            console.log('Login to proceed.');
            res.redirect('/user/signup');
        }
    },

    signup: async (req, res) => {
        res.render('user/signup');
    },



    addUser: async (req, res) => {
        var users = await User.find()
            .then(async () => {
                var data = req.body;
                const salt = bcrypt.genSaltSync(saltRounds);
                const hash = bcrypt.hashSync(req.body.password, salt);
                var newUser = new User({
                    username: req.body.username,
                    password: hash,
                    email: req.body.email
                });
                return newUser;
            })
            .then(async (newUser) => {
                var users = await User.find();
                var newUsername = newUser.username.toLowerCase()
                for (let user of users) {
                    var lowercaseUser = user.username.toLowerCase();
                    if (lowercaseUser === newUsername) {
                        return null;
                    }
                }
                return newUser;
            })
            .then(async (newUser) => {
                if (newUser) {
                    await newUser.save();
                    console.log("saving")
                    return newUser;
                }
                else {
                    return null;
                }
            })
            .then(async (newUser) => {
                if (newUser) {
                    res.redirect('/user/login');
                }
                else {
                    console.log("wrong");
                    res.redirect('/user/signup');
                }
            })
            .catch((err) => {
                console.log(err);

                res.redirect('/user/signup');
            })
    },

    //Logout
    logout: async (req, res) => {
        if (process.env.STATUS === 'development') {
            req.session.destroy();
        }
        else {
            req.session = null
        }
        res.redirect('/user/login');
    },

    //Edit user profile
    editUser: async (req, res) => {
        if (req.session.username) {
            var { username } = req.params;
            var currentUser = await User.findOne({ 'username': username });
            if (currentUser) {
                console.log(currentUser);
                res.render('user/editProfile', { currentUser });
            }
            else {
                console.log(currentUser);
                console.log('Fail');
                res.redirect('/user/login');
            }
        }
        else {
            message = 'Login to proceed.';
            console.log('Login to proceed.');
            res.redirect('/user/login');
        }
    },

    //Update user profile in db
    updateUser: async (req, res) => {
        var users = await User.find()
            .then(async () => {
                var data = req.body;
                const salt = bcrypt.genSaltSync(saltRounds);
                const hash = bcrypt.hashSync(req.body.new_password, salt);
                console.log(req.body.new_username)
                console.log(req.body.new_password)
                var newUser = new User({
                    username: req.body.new_username,
                    password: hash,
                    email: req.body.new_email
                });
                return newUser;
            })

            .then(async (newUser) => {
                console.log(newUser);
                if (newUser) {
                    var query = { 'username': req.session.username };
                    console.log(newUser);
                    User.findOneAndUpdate(query,
                        {
                            username: newUser.username,
                            password: newUser.password,
                            email: newUser.email

                        }, function (err, result) {
                            if (err) {
                                console.log(err);
                            }
                        });
                    return newUser;

                }
                else {
                    return null;
                }
            })
            .then(async (newUser) => {
                // if (newUser) {
                res.redirect('/');
                // }
                // else {
                //     console.log("wrong");
                //     res.redirect('/user/signup');
                // }
            })
            .catch((err) => {
                console.log(err);

                res.redirect('/user/signup');
            })
    },



}

module.exports = controllerUser;