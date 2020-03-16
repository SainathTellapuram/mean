const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

const blogSchema = new Schema({
              firstname:{type:String,required:true},
                  email:{type:String,required:true},
                 mobile:{type:String,required:true},
          qualification:{type:String,required:true},
                address:{type:String,required:true},
                   plan:{type:String,required:true},
                 course:{type:String,required:true},
            nationality:{type:String,required:true},
              createdBy:{type:String}
});
module.exports = mongoose.model('Blog',blogSchema);