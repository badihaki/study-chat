const mongoose = require("mongoose");
const uri = "mongodb+srv://jojackblack:IMN6Sfl5cesPKWL8@sc-cluster.bt1tdfm.mongodb.net/?retryWrites=true&w=majority&appName=SC-Cluster";

async function main(){
    await mongoose.connect(uri);
}

main().catch( (err)=>{
    console.log(err);
} )