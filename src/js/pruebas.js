



const user = [
    {
      name: "Leanne Graham",
      age: 30,
      email: "Sincere@april.biz",
      country: "England",
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org"
    },
    {
      name: "Ervin Howell",
      age: 27,
      email: "Shanna@melissa.tv",
      country: "New Zealand",
      phone: "010-692-6593 x09125",
      website: "anastasia.net",
    }
  ]

  const getUserData = (user, data) =>{
    console.log(data)
   return  user.map(x=>
        x[data]
    )
  
  }

  

  const datos= getUserData( user, 'email');
console.log(datos)










let img ='03d';
let arr = img.split('').slice(0,2).join('')


console.log(arr)
