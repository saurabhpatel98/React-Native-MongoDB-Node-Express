const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
userSchema.pre('save',function(next){
    const user = this;
    if(!user.isModified('password')){
        return next()                   //user no password already hashed hase etle ke modified nai thayele hoy to aapde next perform karsu
        //hash hase password to hash use nathi karvi etle next() call thase.
    }
    bcrypt.genSalt(10,(err,salt)=>{
        if(err){
            return next(err)
        }
     bcrypt.hash(user.password,salt,(err,hash)=>{
         if(err){
             return next(err)
         }
         user.password = hash;
         next()
     })

    })

})


userSchema.methods.comparePassword = function(candidatePassword) {
    const user = this;
    return new Promise((resolve,reject)=>{
        bcrypt.compare(candidatePassword,user.password,(err,isMatch)=>{
            if(err){
                return reject(err)
            }
            if (!isMatch){
                return reject(err)
            }
            resolve(true)
        })
    })

}


mongoose.model('User',userSchema)   //aama aapde export nai karsu bcz aapde eek kartva vadhare model banavsu to error aavse ke aapde model ek var j create kari sakiye chhiye.
