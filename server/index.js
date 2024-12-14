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
// const open = require('open')
const socket = require('socket.io')
const openurl = require ('openurl');
const cookieParser = require('cookie-parser');






const url = 'https://peoplecommune.onrender.com/profile';




const port = 5004;

// app.use(cors())
// const cors = require('cors');
app.use(cors({
  origin: ['https://peoplecommune.onrender.com','http://localhost:8000']
}));

app.use(bodyParser.json())
app.use(cookieParser())


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
 await profilepic.profilepic.findOneAndDelete({'user_id':req.body.userId})

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
        username: req.body.username,
          password:req.body.userpass,
          user_id:req.body.userId
      })
      newprofilepic.save()
      .then(()=>{ res.redirect('https://peoplecommune.onrender.com/profile')})
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
          caption:req.body.caption,
          username: req.body.username,
          password: req.body.userpass,
          comments:[],
          likes:0,
          date:`${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`,
          user_id:req.body.curuserid
     
        })
        
      
        newPost.save()
        .then(()=>{res.redirect('https://peoplecommune.onrender.com/Home')})
        .catch(err=>{console.log(err)})

            
}
})  })

app.get('/', async(req,res)=>{
    const posts = await allPosts.allPosts.find()
    res.send("Working"+ posts)

    // if(req.cookies){
    //   res.redirect('https://peoplecommune.onrender.com/Profile')
    // }

})

app.get('/newPost',async(req,res)=>{
  const postdata=[];
  const posts = await allPosts.allPosts.find()
  // posts.forEach(post1=>{
  //     let onlydata={
  //       caption:post1.caption,
  //       username:post1.username,
  //       password:post1.password,
  //       // comments:post1.comments,
  //       // likes:post1.likes,
  //       // date:post1.date,
  //       user_id:post1.user_id
  //     }

  //     postdata.push(onlydata)
  // })

  res.send(posts)
})


app.post('/profilepic1',async(req,res)=>{
    let userdet = {
      username:req.body.username,
      password:req.body.password
    }
    console.log(userdet)
  const profilepicture = await profilepic.profilepic.findOne({username: userdet.username,password: userdet.password})
  res.json({
    profilepicture:profilepicture
  })
})

app.get('/profilepics',async(req,res)=>{
  const profilepics = await profilepic.profilepic.find()
  res.send(profilepics)
})


app.post('/login', async(req,res)=>{
   const data = {
    username: req.body.username,
    password: req.body.password
   }
  const loggedin = await login.login.findOne({username:data.username, password:data.password})
  res.cookie('data',data.username)
  res.json({loggedin:loggedin})
})

app.get('/getalllogin',async(req,res)=>{
  const alllogins = await login.login.find();
  res.send(alllogins);
})




 app.post('/login1', async(req,res)=>{
  const userdet ={
    username: req.body.username,
    userpass: req.body.password,
    
   }
  const logins1 = await login.login.findOne({'username':userdet.username,'password':userdet.userpass})
  res.json({logins1:logins1})
})



app.post('/loginbyname', async(req,res)=>{
   const userdet ={
    username: req.body.username,
    userpass: req.body.userpass,
    user_id: req.body.user_id
   }

   const logins = await login.login.findOne({'_id':userdet.user_id})
 
  // 
  res.json({
    logins:logins
  })
  //  console.log()
})

// app.get('/alreadylogin',async(req,res)=>{
//    res.redirect('https://peoplecommune.onrender.com/Profile')
// })

app.post('/logins', async(req,res)=>{
 var logindata = {
    username: req.body.username,
    password: req.body.password
  }

  const address = 'https://peoplecommune.onrender.com/profile'
  
  const usercheck  = await login.login.findOne({username: logindata.username})
  const userdatacheck = await userdata.userdata.findOne({username: logindata.username})

if(usercheck==null){
  // await login.login.insertMany(logindata)
//  openurl.open(address)
// console.log ("new user taken")
// res.send({user: "new-user"})
// sessionStorage.setItem('loggedin',"new-user")
}
else{
  try{
    if(usercheck.username == logindata.username && usercheck.password == logindata.password){

    }
    else{
 
     
      res.send({user: "new-user"})
     
      console.log ("new user taken")
    }
  }
  catch(err){
    console.log(err)
  }
}




})

app.post('/signup', async(req,res)=>{
  let signupdata = {
     username: req.body.username,
     password: req.body.password,
     mail: req.body.mail,
     followers:[],
     following:[]
   }
 if(signupdata.username!=''&& signupdata.password!=''){
  await login.login.insertMany(signupdata)
  res.cookie('data',signupdata.username)

 }
 else{console.log('can not sign up')}
  

  // openurl.open('https://peoplecommune.onrender.com/profile');
 

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
      username: req.body.username

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
      postid: req.body.postid,
      username:req.body.username,
      user_id:req.body.user_id,
      password:req.body.password

    }



    let likepost = await login.login.findOne({"username":likes.username, "password":likes.password})
     likepost1 = likepost.liked

    likepost1.push(likes.postid)

    login.login.updateOne({"username":likes.username, "password":likes.password},{$set:{"liked":likepost1}}, {upsert: true}).then(()=>{
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
      postid: req.body.postid,
      username:req.body.username,
      user_id:req.body.user_id,
      password:req.body.password
    }

    let likepost = await login.login.findOne({"username":likes.username, "password":likes.password})
     removelikes = likepost.liked

    removelikes.pop(likes.postid)

    login.login.updateOne({"username":likes.username, "password":likes.password},{$set:{"liked":removelikes}}, {upsert: true}).then(()=>{
      removelikes = []
     }).catch((err)=>{console.log(err)})

   await allPosts.allPosts.updateOne({"_id": likes.postid},{$set:{"likes":likes.likes}}, {upsert: true}).then(()=>{
    // console.log("updated")
   }).catch((err)=>{console.log(err)})
  //  console.log(reqpost)
    
  })

  app.post('/likedposts',async(req,res)=>{
    let userdet = {
      userid: req.body.userid
    }
   const userliked = await login.login.findOne({'_id':userdet.userid})
   res.json({
    likedposts:userliked.liked})
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

  // app.get('/getlikedposts',async(req,res)=>{
  //   let setlikedoposts = []
  //  const currentuser =  await login.login.findOne({"username":sessionStorage.getItem('currentuser-name'), "password":sessionStorage.getItem('currentuser-pass')})


  //  let reqposts =   allPosts.allPosts.findById('66cb08b90ce8cc66ad0fa949')
  
  // })


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
// let followinglist = []
//   app.get('/followinglist',async(req,res)=>{
//     const logins = await login.login.findOne({"username":sessionStorage.getItem('currentuser-name'), "password":sessionStorage.getItem('currentuser-pass')})
//    followinglist = logins.following
//    console.log(followinglist)
//     res.send(followinglist)
//   })

  app.post('/user_id',async(req,res)=>{
    let userdet = {
      username :req.body.username,
      password:req.body.password
    }
    const logins = await login.login.findOne({"username":userdet.username, "password":userdet.password})
  
  //  sessionStorage.setItem('user_Id',logins._id)
    res.json({
      userid:logins
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

    // sessionStorage.removeItem('currentuser-name')
    // sessionStorage.setItem('currentuser-name',newnamedet.name)
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

  app.post('/searchusersdet',async(req,res)=>{
    const userdet = {
      ownerid:req.body.ownerid,
      ownername:req.body.ownername
    }
   const founduser =  await login.login.findOne({'_id':userdet.ownerid})
 res.json({
  founduser:founduser
 })
  })

  app.post('/searchusersdp',async(req,res)=>{
    const userdet = {
      ownerid:req.body.ownerid,
      ownername:req.body.ownername
    }
    const userdp = await profilepic.profilepic.findOne({'user_id':userdet.ownerid})

 res.json({
  userdp:userdp
 })
  })

  app.post('/searchusers',async(req,res)=>{
    const det={
      ownerid:req.body.ownerid,
      ownername:req.body.ownername
    }
    
   const posts = await allPosts.allPosts.find({'user_id':det.ownerid})

res.json({
  // founduser:founduser,
  // userdp:userdp,
  posts:posts
})
  })



app.get('/alluserdet', async(req,res)=>{
   const userdets = await login.login.find();

   res.send(userdets);
})  



  const io = socket(server,{
    cors:{
      origin:'https://peoplecommune.onrender.com',
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

