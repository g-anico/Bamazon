var inquirer = require('inquirer');
var mysql = require('mysql');
// var fs = require('fs');

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

var shopProducts = function(){
  connection.query("SELECT * FROM products", function(err, res){
    //show list of products available for purchase
    //push items into products array using for loop
    inquirer.prompt({
      name: "products",
      type: "rawlist",
      choices: function(value){
        var productsArray = [];
        for(var i = 0; i < res.length; i++){
          productsArray.push(res[i].product_name);
        }
        return productsArray;
      },
      message: "What is the ID of the product you would you like to buy?"
    }).then(function(answer){
      for(var i = 0; i < res.length; i++){

        if(res[i].product_name === answer.products) {
          var chosenItem = res[i];
          inquirer.prompt({
            name: "quantity",
            type: "input",
            message: "How many units would you like to buy?"
          }).then(function(answer){
            console.log("The quantity I want is: " + answer.quantity);
            console.log("This is the quantity available: " + chosenItem.stock_quantity);

            if(chosenItem.stock_quantity < parseInt(answer.quantity)){
              console.log("Sorry, we only have " + chosenItem.stock_quantity + " of those in stock.");
              shopProducts();
            } else {

              connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: chosenItem.stock_quantity - parseInt(answer.quantity)

              }, {
                item_id: chosenItem.item_id
              }], function(err, res){
                  var total = chosenItem.price * parseInt(answer.quantity);
                  console.log("Your total is $" + total);
                  shopProducts();

              });

            }
          })
        }
      }
    })
  })
}
shopProducts();
