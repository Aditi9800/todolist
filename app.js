//mongodb://localhost:27017/todolistDB
//mongodb+srv://admin:test1234@cluster0.uvertd2.mongodb.net/?retryWrites=true&w=majority

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const { dirname } = require("path");
const mongoose = require("mongoose");
const md5 = require("md5");
const ejs = require("ejs");
const e = require("express");



const app=express();

//The default behavior of EJS is that it looks into the 'views' folder for the templates to render
app.set('view engine','ejs');

//var items=[];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


mongoose.connect("mongodb+srv://admin:test1234@cluster0.uvertd2.mongodb.net/todolistDB",{useNewUrlParser:true});
const itemsSchema={
    name:String
};
const Item=mongoose.model("Item",itemsSchema);

const item1=new Item({
    name:"Google"
});
const item2=new Item({
    name:"Microsoft"
});

const item3=new Item({
    name:"amazon"
});
const defaultItems=[item1,item2,item3];


// Item.deleteOne({name:"Google"},function(err){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("successfully deleted the Google document");
//     }
// })

//get method to give response when a user request for / home root route
app.get("/",function(req,res){
    let today=new Date();
     let options={
         weekday:"long",
         month:"long",
         day:"numeric",
         year:"numeric"
     }
     let day=today.toLocaleDateString("en-US",options);
    /*var day="";
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    day=days[today.getDate()+1];*/
   /* if(today.getDate()===0||today.getDate()===6){
        
    res.render("list",{kindofday:day});
     } else{*/

     //find method to print all th eelemnts of database
     Item.find(function(err,itms){
         //to display default elements in list one time only when first time user requset for website
         if(itms.length===0){

            Item.insertMany(defaultItems,function(err){
               if(err){
                console.log(err);
               }
              else{
                console.log("successfully saved all default itms in database");
               }
            });
            //redirecting again to home route
            res.redirect("/");
         }
         else{
    
            res.render("list",{kindofday:day,newListItem:itms});
         }
    
        });     
});

//the POST request adds a new resource to the server, while the PUT request replaces an existing resource on the server
//the HTTP POST request method is used by browsers when submitting HTML form data to the server
app.post("/",function(req,res){

    const itemName=req.body.newItem;
    const item4=new Item({
        name:itemName
    })
    item4.save();
   res.redirect("/");

    // item=req.body.newItem;
    // items.push(item);
    // res.redirect("/");

});

app.post("/delete",function(req,res){
    const checkedItemId=req.body.checkbox;
    Item.findByIdAndRemove(checkedItemId,function(err){
        if(!err){
        console.log("Sucessfully deleted the checked item");
        res.redirect("/")
        }
    })
})
// app.post("/delete",function(req,res){
//     console.log(req.body.checkbox);
// })

//for hosting on heroku as heroku has its own port no.
let port=process.env.PORT;
if(port==null||port==""){
    port=3000;
}

app.listen(port,function(){
    console.log("server is started successfully");
});






//I have tried to find in another way

// const express=require("express");
// const bodyParser=require("body-parser");
// const mongoose = require("mongoose");

// const app=express();

// app.set('view engine','ejs');

// var items=[];

// app.use(bodyParser.urlencoded({extended:true}));
// app.use(express.static("public"));

// mongoose.connect("mongodb://localhost:27017/items",{useNewUrlParser:true});
// const itemsSchema={
//     name:String
// };
// const Item=mongoose.model("Item",itemsSchema);
// const item1=new Item({
//     name:"Google"
// });
// const item2=new Item({
//     name:"Microsoft"
// });

// const item3=new Item({
//     name:"amazon"
// });
// const defaultItems=[item1,item2,item3];
// // Item.insertMany(defaultItems,function(err){
// //     if(err){
// //         console.log(err);
// //     }
// //     else{
// //         console.log("successfully saved all default itms in database");
// //     }
// // })

// // Item.deleteOne({name:"Google"},function(err){
// //     if(err){
// //         console.log(err);
// //     }
// //     else{
// //         console.log("successfully deleted the Google document");
// //     }
// // })
// app.get("/",function(req,res){
//     let today=new Date();
//      let options={
//          weekday:"long",
//          month:"long",
//          day:"numeric",
//          year:"numeric"
//      }
//      let day=today.toLocaleDateString("en-US",options);
//     /*var day="";
//     var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//     day=days[today.getDate()+1];*/
//    /* if(today.getDate()===0||today.getDate()===6){
        
//     res.render("list",{kindofday:day});
//      } else{*/
//      Item.find(function(err,itms){
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log(itms);
//             itms.forEach(function(element){
//                  items.push(element.name);
                
//             })
//             res.render("list",{kindofday:day,newListItem:items});
            
//         }
//     })
// });

// app.post("/",function(req,res){
//     item=req.body.newItem;
//     items.push(item);
//     res.redirect("/");

// })

// app.listen(3000,function(){
//     console.log("server is started on port number 3000");
// });





