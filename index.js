
import axios from "axios";
import { createSecretKey } from "crypto";
import express from "express"
import {dirname} from "path"
import { fileURLToPath } from "url";
const app = express();
const port = 3000;
const __dirname = (dirname(fileURLToPath(import.meta.url)));
app.use(express.static(__dirname+'/public'))
app.set('view engine','ejs');
app.set('views',__dirname+'/views')
app.get('/',async(req,res)=>{
    try{
    const results = await axios.get("https://secrets-api.appbrewery.com/random");
    res.render("index.ejs",{secret : results.data.secret , user : results.data.username});
    console.log(results.data);
    }catch(error){
        console.error("Failed to make request:",error.message);
        res.status(500).send("Failed to Fetch secret , pls try again");
    }
})

app.listen(port,()=>{
    console.log(`server running in port ${port}`);
})