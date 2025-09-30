const mongoose = require("mongoose");
const Listing = require("../models/listings.js");
const initData = require("./data.js");

main()
.then(()=>{
    console.log("DB connected");
})
.catch(()=>{
    console.log("error");
})
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDB = async()=>{
    await Listing.deleteMany();
    initData.data = initData.data.map((el)=>{
        return {...el,owner:"68d020f5a3cabfdece142f47"}
    });
    await Listing.insertMany(initData.data);
    console.log("Data entered");
}
initDB();