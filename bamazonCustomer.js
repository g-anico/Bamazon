var inquirer = require('inquirer');
var mysql = require('mysql');
var fs = require('fs');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database:"bamazon"
});

connection.connect(function(err){
  if(err) throw err;
  console.log("Connected at id: " + connection.threadId);
  console.log("Welcome to Bamazon!");

});
