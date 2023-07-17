require('dotenv').config({path: 'config.env'});
const bcrypt = require('bcrypt');
const User = require('../model/user');

const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();

const { login, checkLogin, userPage ,logout} = require('../controller/controlleruser');

jest.mock('../model/user');
jest.mock('bcrypt');

beforeAll(async () => {
  await mongoose.connect(process.env.dev_DB, {

    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

//render page
describe('User controller', () => {
  describe('login', () => {
    test('should render login page if user is not logged in', () => {
      const req = {
        session: {},
      };
      const res = {
        render: jest.fn(),
      };
      login(req, res);
      expect(res.render).toHaveBeenCalledWith('user/login', { message: false });
    });
  });

  
  it('should log in a user with correct credentials', async () => {
    const username = 'test';
    const password = 'test';
    const saltRounds = 9;
    const hash = await bcrypt.hash(password, saltRounds);
    const user = new User({
      username: username,
      password: hash,
    });
    User.findOne.mockResolvedValueOnce(user);

    const req = {
      body: {
        username: username,
        password: password,
      },
      session: {},
    };

    const res = {
      redirect: jest.fn(),
      render: jest.fn(),
    };

    await checkLogin(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ username: req.body.username });
    expect(bcrypt.compare).toHaveBeenCalledWith(
      req.body.password,
      user.password,
      expect.any(Function)
    );
    
  });

  it('should not log in a user with incorrect credentials', async () => {
    const username = 'test';
    const password = 'test';
    const saltRounds = 9;
    const hash = await bcrypt.hash(password, saltRounds);
    const user = new User({
      username: username,
      password: hash
    });
    await user.save();

    const req = {
      body: {
        username: username,
        password: 'wrongpassword'
      }
    };
    const res = {
      render: jest.fn(),
      redirect: jest.fn()
    };

    await checkLogin(req, res);

    expect(res.render).toHaveBeenCalledWith('user/login', { message: true });
  });

  it('should handle errors when user not found', async () => {
    const req = {
      body: {
        username: 'nonexistentuser',
        password: 'password'
      }
    };
    const res = {
      render: jest.fn(),
      redirect: jest.fn()
    };

    await checkLogin(req, res);

    expect(res.render).toHaveBeenCalledWith('user/login', { message: true });
  });


  afterAll(async () => {
    await mongoose.connection.close();
   });
 });


describe('Test logout function', () => {
    let req;
    let res;
  
    beforeEach(() => {
      req = {};
      res = {
        redirect: jest.fn()
      };
    });
  
    it('should destroy the session in development environment', async () => {
      process.env.STATUS = 'development';
  
      req.session = {
        destroy: jest.fn()
      };
  
      await logout(req, res);
  
      expect(req.session.destroy).toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith('/user/login');
    });
  });






  