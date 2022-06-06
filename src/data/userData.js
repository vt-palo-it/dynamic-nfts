export const getUserData = () => {
  fetch('users.json'
  ,{
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     }
  }
  )
    .then((response)=>{
      return response.json();
    })
    .then((myJson)=> {
      return myJson;

    });
}