//initializes the npm packages that we will be using
var inquirer = require('inquirer');
var mysql = require('mysql');
require("console.table");

//create our mysql connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database:"bamazon"
});
//then initialize the connection
connection.connect(function(err){
  if(err) {
    console.error("Error connection: " + err.stack);
  }
  console.log("Connected at id: " + connection.threadId + " | " + "Welcome to Bamazon!"); //test here to see if it works

  makeTable();
});

function makeTable(){
  connection.query("SELECT * FROM products", function(err, res){
    if(err) throw err;
    //draw the table in the terminal using the response
    console.table(res);
    //prompt the customer for their choice, and pass all the products to promptCustomer
    promptCustomer(res);
  });
}
//the promptCustomer function will take in a response object from our connection query
//all of the items in the table "products" are going to be the choices the user can make the selection from
function promptCustomer(inventory){

  inquirer.prompt([
    {
    type: 'input',
    name: 'choice',
    message: "What is the ID of the item you would you like to purchase? [Quit with Q]",
    validate: function(val) {
      if(isNaN(val)==false){
        return true;
      } else {
        return false;
      }
    }
  }

])
.then(function(val){

    checkIfExit(val.choice); //check if the user wants to quit the application
    var choiceId = parseInt(val.choice);
    var product = checkInventory(choiceId, inventory);

    if(product){
      promptCustomerForQuantity(product);
    }
    else {
      console.log("\nSorry, that item is not in the inventory.");
      makeTable();
    }
  });
}
//function to ask how many of that item they'd like to buy
function promptCustomerForQuantity(product){
  inquirer.prompt([
    {
      type: 'input',
      name: 'quantity',
      message: "How many would you like to buy? [Quit with Q]",
      validate: function(val) {
        if(isNaN(val)==false){
          return true;
        } else {
          return false;
        }
      }
    }
  ])
  .then(function(val){

    checkIfExit(val.quantity);
    var quantity = parseInt(val.quantity);
    if(quantity > product.stock_quantity){
      console.log("\nSorry, we do not have enough in stock!");
      makeTable();
    }
    else {
      makePurchase(product, quantity);
    }
  });
}
//function to make a purchase and update the db
function makePurchase(product, quantity){
  connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [quantity, product.item_id], function(err, res){
      console.log("\nSuccess! You purchased " + quantity + " " +product.product_name + "'s!");
      makeTable();
    }
  );

}
//check if the product the user chose exists in the inventory
function checkInventory(choiceId, inventory){
    for(var i = 0; i < inventory.length; i++){
      if(inventory[i].item_id === choiceId){ //if a matching item is found, return product
        return inventory[i];
      }
    }
    return null; //otherwise return null
}

function checkIfExit(choice){
  if(choice.toLowerCase() === 'q') {
    console.log("Goodbye! Come again!");
    process.exit(0);
  }
}
