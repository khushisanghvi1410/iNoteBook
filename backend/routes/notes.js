import express from 'express';
const router=express.Router();


router.get('/',(req,res)=>{
        res.send('This is notes api')
})



export default router;
