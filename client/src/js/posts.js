import axios from 'axios'
export default async function likedpoststest(userdet){

   try{
  const likedposts = await fetch( 'https://new-commune-1.onrender.com/likedposts',
    
         {
            method:'POST',
              headers:{accept:'application/json'},
              body: JSON.stringify(userdet)
          })
       
   
     console.log(likedposts)
    return likedposts;
   //  return null
   }
   catch(error){
  
  return null;
   }
}