const express = require('express');
const cookieParser = require('cookie-parser');
const Joi = require('joi');
const { auth } = require('express-openid-connect');
const fsPromise = require('fs/promises');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const fs = require('fs');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const path = require("path");
const session = require('express-session');

module.exports = {
  express,
  cookieParser,
  Joi,
  auth,
  fsPromise,
  jwt,
  moment,
  fs,
  passport,
  GoogleStrategy,
  path,
  session
}