const express = require ('express');
const app = express();
const cors = require ('cors')
const bodyParser = require('body-parser')
const allPosts = require ('./mongoose')
const login = require('./mongoose')
const userdata = require('./mongoose')
const messages = require('./mongoose')
const multer = require ('multer');
const profilepic = require('./mongoose')
const socket = require('socket.io')
const openurl = require ('openurl')



// const allowed = ['https://communepeople.vercel.app/','https://communepeople.vercel.app/logins','https://communepeople.vercel.app/profile','https://nss2server.vercel.app/events']




if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
const port = 5004;

app.use(cors())
app.use(bodyParser.json())



const server = app.listen(port,() =>{
    console.log(`listening on port ${port}`)
})

const Storage = multer.diskStorage({
    destination:function(req,file,cb){
     return cb(null,'./uploads')
    },
    filename:(req, file, cb)=>{
      cb(null,`${file.originalname}`);
}
  })

  const upload = multer({
    Storage
  }).single('newPost')

  const profilepicture = multer({
    Storage
  }).single('newprofilepic')

let newPost;
let newprofilepic;

 app.post('/profilepic',async(req,res)=>{

 
 await profilepic.profilepic.deleteOne({username: localStorage.getItem('currentuser-name'),password: localStorage.getItem('currentuser-pass')})
  profilepicture(req,res,(err)=>{
    if(err){
      console.log(err)
    }
    else{

      newprofilepic = new profilepic.profilepic({
        profile:{
          data: req.file.buffer,
          contentType:'image/png'

        },
        username: localStorage.getItem('currentuser-name'),
          password:localStorage.getItem('currentuser-pass'),
          user_id:localStorage.getItem('user_Id')
      })
      newprofilepic.save()
      .then(()=>{res.redirect('http://localhost:5173/profile')})
      .catch(err=>{console.log(err)})
    }
  })
 })

  app.post('/newPost', async(req,res)=>{
    upload(req,res,(err)=>{
      if(err){
        console.log(err)
      }
      else{
        const d= new Date();
       newPost =  new  allPosts.allPosts({
         post:{
            data: req.file.buffer,
            contentType:'image/png'
          },
          caption:req.body.caption?req.body.caption:"",
          username: localStorage.getItem('currentuser-name'),
          password:localStorage.getItem('currentuser-pass'),
          comments:[],
          likes:0,
          date:`${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`,
          user_id:localStorage.getItem('user_Id')
     
        })
        
        // localStorage.setItem('postdata',JSON.stringify(newpost1))
        newPost.save()
        .then(()=>{res.redirect('http://localhost:5173/Home')})
        .catch(err=>{console.log(err)})

            
}
})  })

app.get('/', async(req,res)=>{
    const posts = await allPosts.allPosts.find()
    res.send("Working"+ posts)

})

app.get('/newPost',async(req,res)=>{
  const posts = await allPosts.allPosts.find()
  res.send(posts)
})

app.get('/profilepic',async(req,res)=>{
  const profilepicture = await profilepic.profilepic.findOne({username: localStorage.getItem('currentuser-name'),password: localStorage.getItem('currentuser-pass')})
  res.send(profilepicture)
})

app.get('/profilepics',async(req,res)=>{
  const profilepics = await profilepic.profilepic.find()
  res.send(profilepics)
})


app.get('/login', async(req,res)=>{
  const logins = await login.login.find()
  res.send(logins)
})


app.post('/logins', async(req,res)=>{
 var logindata = {
    username: req.body.username,
    password: req.body.password
  }

  localStorage.setItem("currentuser-name", req.body.username)
  localStorage.setItem("currentuser-pass", req.body.password)




  const address = 'http://localhost:5173/profile'
  
  const usercheck  = await login.login.findOne({username: logindata.username})
  const userdatacheck = await userdata.userdata.findOne({username: logindata.username})

if(usercheck==null){
  // await login.login.insertMany(logindata)
//  openurl.open(address)
// console.log ("new user taken")
// res.send({user: "new-user"})
localStorage.setItem('loggedin',"new-user")
}
else{
  try{
    if(usercheck.username == logindata.username && usercheck.password == logindata.password){
      localStorage.setItem("currentuser-name", req.body.username)

      openurl.open(address)

     localStorage.setItem('loggedin',"existing-user")
    }
    else{
      // await login.login.insertMany(logindata)
      // openurl.open(address)
     
      res.send({user: "new-user"})
     
      console.log ("new user taken")
    }
  }
  catch(err){
    console.log(err)
  }
}

app.get('/logins',(req,res)=>{

  if(localStorage.getItem("loggedin")== 'new-user'){
   res.send({user:"new-user"})
  }
  else{
    res.send({user:"existing-user"})
  }

})


})

app.post('/signup', async(req,res)=>{
  let signupdata = {
     username: req.body.username,
     password: req.body.password,
     mail: req.body.mail,
     followers:[],
     following:[]
   }
   localStorage.setItem("currentuser-name", req.body.username)
   localStorage.setItem("currentuser-pass", req.body.password)
  //  localStorage.setItem("currentuser-mail", req.body.mail)

  await login.login.insertMany(signupdata)


  openurl.open('http://localhost:5173/profile')

  })

  app.post('/myPost',async(req,res)=>{

    const userpostdata = {
      username: req.body.username,
      password:req.body.password
    }

const mypost =  await allPosts.allPosts.find({username:userpostdata.username, password:userpostdata.password})
if(mypost){
  res.send(mypost)
  // console.log(mypost)
}
else{

}

  })

  let arr = [];

  app.post('/comment',async(req,res)=>{
    const newcomment = {
      comments: req.body.comment,
      postid: req.body.postid,
      username: localStorage.getItem('currentuser-name')

    }

  
  //  arr.push({comment:newcomment.comments, username:newcomment.username})
 
   let reqpost = await allPosts.allPosts.findById(newcomment.postid)

   arr= reqpost.comments

   arr.push({comment:newcomment.comments, username:newcomment.username})
  //  arr.push(newcomment.comments)

  
   await allPosts.allPosts.updateOne({"_id": newcomment.postid},{$set:{"comments":arr}}, {upsert: true}).then(()=>{
    // console.log("updated")
   }).catch((err)=>{console.log(err)})
  //  console.log(reqpost)
   
  })


  let likepost1 = []
  app.post('/likes',async(req,res)=>{
    const likes = {
      likes: req.body.likes,
      postid: req.body.postid

    }

    let likepost = await login.login.findOne({"username":localStorage.getItem('currentuser-name'), "password":localStorage.getItem('currentuser-pass')})
     likepost1 = likepost.liked

    likepost1.push(likes.postid)

    login.login.updateOne({"username":localStorage.getItem('currentuser-name'), "password":localStorage.getItem('currentuser-pass')},{$set:{"liked":likepost1}}, {upsert: true}).then(()=>{
      likepost1 = []
     }).catch((err)=>{console.log(err)})

   await allPosts.allPosts.updateOne({"_id": likes.postid},{$set:{"likes":likes.likes}}, {upsert: true}).then(()=>{
    // console.log("updated")
   }).catch((err)=>{console.log(err)})
  //  console.log(reqpost)
    
  })

  let removelikes = []
  app.post('/removelikes',async(req,res)=>{
    const likes = {
      likes: req.body.likes,
      postid: req.body.postid

    }

    let likepost = await login.login.findOne({"username":localStorage.getItem('currentuser-name'), "password":localStorage.getItem('currentuser-pass')})
     removelikes = likepost.liked

    removelikes.pop(likes.postid)

    login.login.updateOne({"username":localStorage.getItem('currentuser-name'), "password":localStorage.getItem('currentuser-pass')},{$set:{"liked":removelikes}}, {upsert: true}).then(()=>{
      removelikes = []
     }).catch((err)=>{console.log(err)})

   await allPosts.allPosts.updateOne({"_id": likes.postid},{$set:{"likes":likes.likes}}, {upsert: true}).then(()=>{
    // console.log("updated")
   }).catch((err)=>{console.log(err)})
  //  console.log(reqpost)
    
  })

  app.get('/likedposts',async(req,res)=>{
   const userliked = await login.login.findOne({"username":localStorage.getItem('currentuser-name'), "password":localStorage.getItem('currentuser-pass')})
   res.send(userliked.liked)
  })


  var followarr = []
  var followarr1 = []

  app.post('/follow',async(req,res)=>{
    const follower = {
      username: req.body.username,
      password: req.body.password,
      curuser:req.body.curuser,
      curuserpass:req.body.curuserpass

    }
    
    let reqpost = await login.login.findOne({"username":follower.curuser, "password":follower.curuserpass})
    let reqpost1 = await login.login.findOne({"username":follower.username, "password":follower.password})
   console.log(follower)
   
    followarr =reqpost1.followers
    followarr1= reqpost.following
    
    followarr.push({name:follower.curuser,id:reqpost._id})
    followarr1.push({name:follower.username,id:reqpost1._id})

   login.login.updateOne({"username":follower.username, "password":follower.password},{$set:{"followers":followarr}}, {upsert: true}).then(()=>{
    followarr = []
   }).catch((err)=>{console.log(err)})

   
  //  console.log(reqpost)

  login.login.updateOne({"username":follower.curuser, "password":follower.curuserpass},{$set:{"following":followarr1}}, {upsert: true}).then(()=>{
    followarr1 = []
   
   }).catch((err)=>{console.log(err)})


    
  })

  app.get('/getlikedposts',async(req,res)=>{
    let setlikedoposts = []
   const currentuser =  await login.login.findOne({"username":localStorage.getItem('currentuser-name'), "password":localStorage.getItem('currentuser-pass')})


   let reqposts =   allPosts.allPosts.findById('66cb08b90ce8cc66ad0fa949')
  
  })


  app.post('/unfollow',async(req,res)=>{
    const follower = {
      username: req.body.username,
      password: req.body.password,
      curuser:req.body.curuser,
      curuserpass:req.body.curuserpass

    }
    
    let reqpost = await login.login.findOne({"username":follower.curuser, "password":follower.curuserpass})
    let reqpost1 = await login.login.findOne({"username":follower.username, "password":follower.password})


    followarr =reqpost1.followers
    followarr1= reqpost.following
    
    followarr.pop(follower.curuser)
    followarr1.pop(follower.username)

   login.login.updateOne({"username":follower.username, "password":follower.password},{$set:{"followers":followarr}}, {upsert: true}).then(()=>{
    followarr = []
   }).catch((err)=>{console.log(err)})

   
  //  console.log(reqpost)

  login.login.updateOne({"username":follower.curuser, "password":follower.curuserpass},{$set:{"following":followarr1}}, {upsert: true}).then(()=>{
    followarr1 = []
   
   }).catch((err)=>{console.log(err)})

  
    
  })
let followinglist = []
  app.get('/followinglist',async(req,res)=>{
    const logins = await login.login.findOne({"username":localStorage.getItem('currentuser-name'), "password":localStorage.getItem('currentuser-pass')})
   followinglist = logins.following
   console.log(followinglist)
    res.send(followinglist)
  })

  app.get('/user_id',async(req,res)=>{
    const logins = await login.login.findOne({"username":localStorage.getItem('currentuser-name'), "password":localStorage.getItem('currentuser-pass')})
  
   localStorage.setItem('user_Id',logins._id)
    res.send({
      user_id:logins._id
    })
  })


  app.post('/updatemail',async (req,res)=>{
    const newmaildet = {
     mail:req.body.mail,
     username:req.body.username,
     password:req.body.password
    }

   await login.login.updateOne({"username":newmaildet.username,"password":newmaildet.password},{$set:{"mail":newmaildet.mail}})

  })

  app.post('/updatename',async (req,res)=>{
    const newnamedet = {
     name:req.body.name,
     username:req.body.username,
     password:req.body.password
    }

    localStorage.removeItem('currentuser-name')
    localStorage.setItem('currentuser-name',newnamedet.name)
   await login.login.updateOne({"username":newnamedet.username,"password":newnamedet.password},{$set:{"username":newnamedet.name}})

  })

  app.post('/delpost',async(req,res)=>{
    const delid = req.body.delid

    await allPosts.allPosts.findByIdAndDelete(delid)

  })


  app.post('/sendmsg', async(req,res)=>{
    const {from_id,toid,message} = req.body
    const data = await messages.messages.create(
      {
        message:{
          text: message
        },
        users:[from_id,toid],
        sender: from_id,

      }
    )
    if(data) return({msg:"message added"})
      return({msg:"failed to add message"})

  })

  app.post('/getmsg',async(req,res)=>{
    const{from_id,toid} = req.body

    const getmsg = await messages.messages.find({
      users:{
        $all:[from_id,toid]
      }
    })
    .sort({updatedAt:1})

    const projectmsgs = getmsg.map(msg=>{
      return{
        fromself: msg.sender.toString() === from_id,
        message: msg.message.text
      }
    })
    res.json(projectmsgs)
  })

  app.post('/searchusers',async(req,res)=>{
    const det={
      ownerid:req.body.ownerid,
      ownername:req.body.ownername
    }
    
   const founduser =  await login.login.findOne({'_id':det.ownerid})
   const userdp = await profilepic.profilepic.findOne({'user_id':det.ownerid})
   const posts = await allPosts.allPosts.find({'user_id':det.ownerid})
 

  
   
res.json({
  founduser:founduser,
  userdp:userdp,
  posts:posts
})
  })


  const io = socket(server,{
    cors:{
      origin:'http://localhost:5173',
      Credential:true
    }
  })
  // const io = require('socket.io')(server)
 global.onlineusers = new Map();

 io.on('connection',(socket)=>{
  // console.log('socket is working')
   global.chatSocket = socket;
   socket.on('add-user',(curuserid)=>{

      onlineusers.set(curuserid,socket.id)
      // console.log(curuserid)
   })

   socket.on('sendmsg',(msgdata)=>{
    const senduser = onlineusers.get(msgdata.to)
    console.log(msgdata)
    if(senduser){
      socket.to(senduser).emit("recievemsg",msgdata.msg)
    }
 })
 })

