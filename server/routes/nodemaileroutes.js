// var router = require('express').Router();
// var pg = require('pg');
// var cron = require('cron');
// var nodemailer = require('nodemailer');
// var config = {
//   database: 'bigtoe',
//   host: 'localhost',
//   port: 5432,
//   max: 10,
//   idleTimeoutMillis: 30000
// };
// var pool = new pg.Pool(config);
//
// // send an email once per week to user who has an "empty" cell in gigs table
// // once per week, node-cron calls findEmpty() function: gets gigs table, compares columns to empty,
// // if guitar, trumpet, trombone, sax, keys, bass, female_vocals, drums, male_vocals === empty then sendEmail()
// // must check against email database: users
//
// var job = new cron.CronJob('* * * * *', function() {
//   findEmpty();
//   console.log('Function executed!');
// }); //actually want this: '5 16 * * sun'
