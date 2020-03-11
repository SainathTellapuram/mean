const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

let validEmailChecker = (email) =>{
    if(!email){
        return false;
    } else {
        const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regExp.test(email);
    }
}
let emailLengthChecker = (email) =>{
    if(!email){
        return false;
    } else {
        
    }
}
const emailValidators = [
    {
        validator : emailLengthChecker,message:'EMail must be more than 5 and less than 30 characters'
    },
    {
        validator : validEmailChecker,message:'Must be valid EMail'
    }
];

const blogSchema = new Schema({
              firstname:{type:String,required:true,unique:true,lowercase:true},
                  email:{type:String,required:true,unique:true,lowercase:true},
                 mobile:{type:String,required:true,unique:true,lowercase:true},
          qualification:{type:String,required:true,unique:true,lowercase:true},
                address:{type:String,required:true,unique:true,lowercase:true},
                   plan:{type:String,required:true,unique:true,lowercase:true},
                 course:{type:String,required:true,unique:true,lowercase:true},
            nationality:{type:String,required:true,unique:true,lowercase:true},
              createdBy:{type:String}
});
module.exports = mongoose.model('Blog',blogSchema);