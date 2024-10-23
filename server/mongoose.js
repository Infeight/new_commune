const { text } = require('body-parser')
const mongoose = require ('mongoose')

mongoose.connect('mongodb+srv://superkings0987:lKfFTdWCTKBz25Hq@cluster1.w3zyf.mongodb.net/').then(()=>{
    console.log('Connected to db')
}).catch(()=>{
    console.log("Sorry, There's an error!")
})

const allPostsSchema= new mongoose.Schema({
    post:{
        data:Buffer,
       
    },
    caption:{
        type:String
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required: true
    },
    comments:{
        type:Array
    },
    likes:{
        type:Number
    },
    date:{
        type:String
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId
    }
}) 

const loginSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    mail:{
        type:String,
        required:true
    },
    followers:{
        type:Array
    },
    following:{
        type:Array
    },
    liked:{
        type:Array
    }
})

const userdataSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    posts:{type:Array}
    
})

const profilepicSchema = new mongoose.Schema({
    profile:{
        data:Buffer
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId
    }
}) 


const msgSchema = new mongoose.Schema({
    message:{
       text:{
        type:String,
        required:true
       }
    },
    users:Array,
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,

    }},
    {timestamps:true}

)

// const userpostsSchema = new mongoose.Schema({
//     posts:[allPostsSchema]
// })

const allPosts = mongoose.model('allPosts',allPostsSchema)
const login = mongoose.model('logins', loginSchema)
const userdata = mongoose.model('userdata',userdataSchema)
const profilepic = mongoose.model('profilepic',profilepicSchema)
const messages = mongoose.model('messages',msgSchema)
// const userposts = mongoose.model('userposts',userpostsSchema)
module.exports = {allPosts,login,userdata,profilepic,messages}