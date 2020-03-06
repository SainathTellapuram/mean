const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
// Email validation
let emailLengthChecker = (email) =>{
    if(!email){
        return false;
    } else {
        if(email.length < 5 || email.length > 31){
            return false;
        } else {
            return true;
        }
    }
}

let validEmailChecker = (email) =>{
    if(!email){
        return false;
    } else {
        const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regExp.test(email);
    }
}

const emailValidators = [
    {
        validator : emailLengthChecker,message:'EMail must be more than 5 and less than 30 characters'
    },
    {
        validator : validEmailChecker,message:'Must be valid EMail'
    }
]
// firstname validation
let firstnameLengthChecker = (firstname) =>{
    if(!firstname){
        return false;
    } else {
        if(firstname.length < 3 || firstname.length > 15){
            return false;
        } else {
            return true;
        }
    }
}

let validfirstname = (firstname) =>{
    if(!firstname){
        return false;
    } else {
        const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
        return regExp.test(firstname)
    }
};

const firstnamevalidators = [{
    validator : firstnameLengthChecker,
    message:"firstname must be at least 3 character but no more 15 character"
},
{
    validator : validfirstname,
    message:"Must be a valid firstname"
}
]
// Mobile Validations
let mobileLengthChecker = (mobile) =>{
    if(!mobile){
        return false;
    } else {
        if(mobile.length < 10 || mobile.length > 12){
            return false;
        } else {
            return true;
        }
    }
}

let validMobile = (mobile) =>{
    if(!mobile){
        return false;
    } else {
        const regExp = new RegExp(/^[0-9]+$/);
        return regExp.test(mobile)
    }
};

const mobilevalidators = [{
    validator : mobileLengthChecker,
    message:"firstname must be at least 10 character but no more 12 character"
},
{
    validator : validMobile,
    message:"Must be a valid Mobile"
}
]
// qualification Validation
let qualificationLengthChecker = (qualification) =>{
    if(!qualification){
        return false;
    } else {
        if(qualification.length < 3 || qualification.length > 15){
            return false;
        } else {
            return true;
        }
    }
}

let validqualification = (qualification) =>{
    if(!qualification){
        return false;
    } else {
        const regExp = new RegExp(/^[a-zA-Z]+$/);
        return regExp.test(qualification)
    }
};
const qualificationvalidators = [{
    validator : qualificationLengthChecker,
    message:"Qualification must be at least 3 character but no more 15 character"
},
{
    validator : validqualification,
    message:"Must be a valid Qualification"
}
]

//address
let addressLengthChecker = (address) =>{
    if(!address){
        return false;
    } else {
        if(address.length < 10 || address.length > 200){
            return false;
        } else {
            return true;
        }
    }
}
let validaddress = (address) =>{
    if(!address){
        return false;
    } else {
        const regExp = new RegExp(/^[a-zA-Z]+$/);
        return regExp.test(address)
    }
};
const addressvalidators = [{
    validator : addressLengthChecker,
    message:"Address must be at least 10 character but no more 200 character"
},
{
    validator : validaddress,
    message:"Must be a valid Address"
}
]

//schema
let planLengthChecker = (plan) =>{
    if(!plan){
        return false;
    } else {
        if(plan.length < 4 || plan.length > 10){
            return false;
        } else {
            return true;
        }
    }
}
let validplan = (plan) =>{
    if(!plan){
        return false;
    } else {
        const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
        return regExp.test(plan)
    }
};
const planvalidators = [{
    validator : planLengthChecker,
    message:"Plan Name must be at least 4 character but no more 10 character"
},
{
    validator : validplan,
    message:"Must be a valid Plan Name"
}
]

//course
let courseLengthChecker = (course) =>{
    if(!course){
        return false;
    } else {
        if(course.length < 4 || course.length > 15){
            return false;
        } else {
            return true;
        }
    }
}
let validcourse = (course) =>{
    if(!course){
        return false;
    } else {
        const regExp = new RegExp(/^[a-zA-Z]+$/);
        return regExp.test(course)
    }
};
const coursevalidators = [{
    validator : courseLengthChecker,
    message:"Course must be at least 4 character but no more 15 character"
},
{
    validator : validcourse,
    message:"Must be a valid Course"
}
]

//country
let countryLengthChecker = (country) =>{
    if(!country){
        return false;
    } else {
        if(country.length < 4 || country.length > 15){
            return false;
        } else {
            return true;
        }
    }
}
let validcountry = (country) =>{
    if(!country){
        return false;
    } else {
        const regExp = new RegExp(/^[a-zA-Z]+$/);
        return regExp.test(country)
    }
};
const countryvalidators = [{
    validator : countryLengthChecker,
    message:"Country Name must be at least 3 character but no more 20 character"
},
{
    validator : validcountry,
    message:"Must be a valid Country"
}
]

//Status
let statusLengthChecker = (status) =>{
    if(!status){
        return false;
    } else {
        if(status.length < 6 || status.length > 10){
            return false;
        } else {
            return true;
        }
    }
}
let validstatus = (status) =>{
    if(!status){
        return false;
    } else {
        const regExp = new RegExp(/^[a-zA-Z]+$/);
        return regExp.test(status)
    }
};
const statusvalidators = [{
    validator : statusLengthChecker,
    message:"status Name must be at least 6 character but no more 10 character"
},
{
    validator : validstatus,
    message:"Must be a valid status"
}
]


const clientSchema = new Schema({
    firstname :{ type : String,required:true,validate:firstnamevalidators},
    mobile :{ type : Number,required:true,validate:mobilevalidators},
    email :{ type : String,required:true,unique:true,lowercase:true,validate:emailValidators},
    qualification :{ type : String,required:true,validate:qualificationvalidators},
    address :{ type : String,required:true,validate:addressvalidators},
    plan :{ type : String,required:true,validate:planvalidators},
    course :{ type : String,required:true,validate:coursevalidators},
    country :{ type : String,required:true,validate:countryvalidators},
    status: { type : String,required:true,validate:statusvalidators},
    AddedOn:{ type:Date,default:Date.now()}

});
module.exports = mongoose.model('Client',clientSchema);