import express from "express";
import {prisma} from "@repo/db/prisma"
const app =express();

app.use(express.json());

app.get("/", (req,res)=> {
    res.json({ 
        message : "hi"
    })
})

app.post("/signup", async(req,res)=> {
    const {username,password} = req.body;

    if(!username || !password){
        res.json({
            message : "invalid request"
        });
        return;
    }

    //db call
    try{
        const user = await prisma.user.create({
            data: {
                username : username,
                password: password
            }
        })

        if(!user){
            res.json({
                message : "signup failed"
            });
            return
        }

        res.json({
            message : "signup success",
            userid : user.id
        })
    }catch(e){
        res.json({
            message : "error in signup"
        })
    }
})

app.listen(3001);