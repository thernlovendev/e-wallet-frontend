  export function createEmailUser (data) {
      return (
        new Promise (async (res, rej) => {
          fetch("https://radiant-gorge-42555.herokuapp.com/createEmailUser", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
                },
            body: await JSON.stringify(data),
          }).then((data) => {
              res(data)
          }).catch(error => { rej(error) })
        })
    )
  }
  
  export function getUserEmailData (data) {
      return (
        new Promise (async (res, rej) => {
          fetch("https://radiant-gorge-42555.herokuapp.com/getUserEmailData", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
                },
            body: await JSON.stringify(data),
          }).then((data) => {
              res(data)
          }).catch(error => { rej(error) })
        })
      )
  }
  
  export function verifyIdentity (image1, image2, id, ID) {
      return(
          new Promise ((res, rej) => {
            const data = {
              image1: image1,
              image2: image2,
              id: id,
              ID: ID
            };
              fetch("https://radiant-gorge-42555.herokuapp.com/verifyIdentity", {
                  method: "POST",
                  body: JSON.stringify(data),
                  headers: { "Content-Type": "application/json" },
              }).then(data => {
                  console.log(data)
                  if(data.status === 400){
                    rej(400)
                  }
                  if(data.status === 401){
                    console.log(data.json())
                    rej(401)
                  }
                  if(data.status === 404){
                    rej(404)
                  }else{
                    res(data.json())
                  }
              }).catch(error => {
                  console.log(error)
                  rej(error)
              })
            })
      )
  }
 
  export function confirmPhone (id, phone) {
    return(
        new Promise ((res, rej) => {
          const data = {
            id : id,
            phone : phone
          };
          
            fetch("https://radiant-gorge-42555.herokuapp.com/confirmPhone", {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            }).then(data => {
                console.log(data)
                if(data.status === 400){
                  rej(400)
                }
                if(data.status === 404){
                  rej(404)
                }
                res(data)
            }).catch(error => {
                console.log(error)
                rej(error)
            })
          })
    )
  }

  export function confirmPhoneCode (id, code) {
    const data = {
      id : id,
      code : code
    }
    return(
      new Promise (async (res, rej) => {
  
        fetch("https://radiant-gorge-42555.herokuapp.com/confirmPhoneCode", {
          method: "POST",
          headers: {
            "Content-Type" : "application/json"
            },
          body: await JSON.stringify(data),
        
      }).then(data=> {
        if(data.status === 400){
          rej(400)
        }
        if(data.status != 200){
          rej(404)
        }
        res(data.json())
      }).catch(error => {
        console.log(error)
        rej(error)
      })
      })
    )
  }

  export function confirmPhoneCode2 (id, code, phone) {
    const data = {
      id : id,
      code : code,
      phone : phone
    }
    return(
      new Promise (async (res, rej) => {
  
        fetch("https://radiant-gorge-42555.herokuapp.com/confirmPhoneCode", {
          method: "POST",
          headers: {
            "Content-Type" : "application/json"
            },
          body: await JSON.stringify(data),
        
      }).then(data=> {
        if(data.status === 400){
          rej(400)
        }
        if(data.status != 200){
          rej(404)
        }
        res(data.json())
      }).catch(error => {
        console.log(error)
        rej(error)
      })
      })
    )
  }

  export function editPhone (id, phone) {
    const data = {
      id : id,
      phone : phone
    }
    return(
      new Promise (async (res, rej) => {
  
        fetch("https://radiant-gorge-42555.herokuapp.com/confirmPhoneCode", {
          method: "POST",
          headers: {
            "Content-Type" : "application/json"
            },
          body: await JSON.stringify(data),
        
      }).then(data=> {
        if(data.status === 400){
          rej(400)
        }
        if(data.status != 200){
          rej(404)
        }
        res(data.json())
      }).catch(error => {
        console.log(error)
        rej(error)
      })
      })
    )
  }

  export function verifyAddress(id, address, country) {
    const data = {
      id: id,
      address: {
        city: address.city,
        line1: address.line1,
        postal_code: address.postal_code,
        state: address.state
      },
      country: country
    };
  
    return new Promise((res, rej) => {
      fetch("https://radiant-gorge-42555.herokuapp.com/confirmAddress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(data => {
          if(data.status === 400){
            rej(400)
          }
          if(data.status != 200){
            rej(404)
          }else{
            res(data.json())
          }

        }).catch(error => {
          rej(error);
        });
    });
  }
  
  export function addCard (id, cardNumber, CVC, month, year) {
    const data = {
      id: id,
      cardNumber : cardNumber,
      CVC : CVC,
      month : month,
      year : year
    }
    return(
      new Promise (async (res, rej) => {
  
        fetch("https://radiant-gorge-42555.herokuapp.com/addCard", {
          method: "POST",
          headers: {
            "Content-Type" : "application/json"
            },
          body: await JSON.stringify(data),
        }).then(data=> {
          if(data.status === 400){
            rej(400)
          }
          if(data.status != 200){
            rej(404)
          }
          res(data.json())
        }).catch(error => {
          console.log(error)
          rej(error)
        })
      })
    )
  }
  
  export function addBanckAccount (id, accountNumber) {
    const data = {
      id : id,
      accountNumber : accountNumber
    }
    return(
      new Promise (async(res,rej) => {
        fetch("https://radiant-gorge-42555.herokuapp.com/addBanckAccount2",{
          method: "POST",
          headers: {
            "Content-Type" : "application/json"
            },
          body: await JSON.stringify(data),
          }).then(data=> {
            if(data.status === 400){
              rej(400)
            }
            if(data.status != 200){
              rej(404)
            }
            res(data.json())
          }).catch(error => {
            console.log(error)
            rej(error)
          })
        })
      )
  }

  export function addMoney2 (id, amount, card, currency, localAmount){
    const data = {
      id : id,
      amount: amount,
      date : new Date(),
      card: card,
      currency: currency,
      localAmount: localAmount
    }
    console.log(data)
    return(
      new Promise(async(res,rej)=> {
        fetch("https://radiant-gorge-42555.herokuapp.com/chargeMoney2",{
          method: "POST",
          headers: {
            "Content-Type" : "application/json"
            }, 
          body: await JSON.stringify(data),
        }).then(data=> {
          if(data.status === 400){
            rej(400)
          }
          if(data.status != 200){
            rej(404)
          }
          res(data.json())
        }).catch(error => {
          console.log(error)
          rej(error)
        })
      })
    )
  }

  export async function confirmCodeCharge (id, code){
    const data = {
      id : id,
      code : code
    }
    return(
      new Promise (async (res, rej) => {
        fetch("https://radiant-gorge-42555.herokuapp.com/confirmChargeCode", {
          method: "POST",
          headers: {
              "Content-Type" : "application/json"
              },
          body: await JSON.stringify(data),
        }).then((data) => {
          if(data.status === 400){
            rej(400)
          }if(data.status === 404){
            rej(404)
          }else{
            res(data.json())
          }
        }).catch(error => { rej(error) })
      })
    )
  }
  
  export async function withdraw2 (id, amount, currency, localAmount) {
    const data = {
      id: id,
      amount: amount,
      date : await new Date(),
      localAmount: localAmount,
      currency: currency,
      action: "withdraw"
    }
    return(
      new Promise (async (res, rej) => {
        fetch("https://radiant-gorge-42555.herokuapp.com/withdraw3",{
          method: "POST",
          headers: {
            "Content-Type" : "application/json"
            },
          body: await JSON.stringify(data),
        }).then(data => {
          if(data.status == 400){
            rej(data.status);
          }
          res(data.json())
        }).catch(error =>{
          rej(error)
        })
      })
    )
  }
  
  export function userTransfer (id, amount, destination) {
    const data = {
      id: id,
      amount: amount,
      destination: destination,
      date : new Date()
    }
    return(
      new Promise(async (res,rej)=>{
        fetch("https://radiant-gorge-42555.herokuapp.com/userTranfer",{
          method: "POST",
          headers: {
            "Content-Type" : "application/json"
            },
          body: await JSON.stringify(data),
        }).then(data => {
          console.log(data.status)
          if(data.status == 400){
            rej(data.status);
          }
          if(data.status == 401){
            rej(data.status);
          }
          if(data.status == 402){
            rej(data.status);
          }
          res(data.json())
        }).catch(async (error) =>{
          await console.log(error)
          //const errorData = await error.json(); // convierte el cuerpo de la respuesta en un objeto JSON
          const statusCode = error.status; // obtiene el código de estado de la respuesa
          const errorObj = new Error(); // crea un nuevo objeto Error con el mensaje de error
          errorObj.status = statusCode; // añade la propiedad status al objeto Error
          rej(errorObj); // rechaza la promesa con el nuevo objeto Error
        })
      })
    )
  }
  
  export async function userTransfer2 (id, amount, destination, currency) {
    const data = {
      id: id,
      amount: amount,
      destination: destination,
      date : await new Date(),
      currency: currency,
      action: "transfer"
    }
    return(
      new Promise(async (res,rej)=>{
        fetch("https://radiant-gorge-42555.herokuapp.com/userTransfer3",{
          method: "POST",
          headers: {
            "Content-Type" : "application/json"
            },
          body: await JSON.stringify(data),
        }).then(data => {
          console.log(data.status)
          if(data.status == 400){
            rej(data.status);
          }
          if(data.status == 401){
            rej(data.status);
          }
          if(data.status == 402){
            rej(data.status);
          }
          res(data.json())
        }).catch(async (error) =>{
          await console.log(error)
          //const errorData = await error.json(); // convierte el cuerpo de la respuesta en un objeto JSON
          const statusCode = error.status; // obtiene el código de estado de la respuesa
          const errorObj = new Error(); // crea un nuevo objeto Error con el mensaje de error
          errorObj.status = statusCode; // añade la propiedad status al objeto Error
          rej(errorObj); // rechaza la promesa con el nuevo objeto Error
        })
      })
    )
  }
  
  export function activateWallet (id) {
    const data = {
      id : id
    }
    return(
      new Promise(async(res, rej) =>{
        fetch("https://radiant-gorge-42555.herokuapp.com/activateWallet",{
          method: "POST",
          headers: {
            "Content-Type" : "application/json"
            },
          body: await JSON.stringify(data),
        }).then(data=> {
          if(data.status === 400){
            rej(400)
          }
          if(data.status != 200){
            rej(404)
          }
          res(data.json())
        }).catch(error => {
          console.log(error)
          rej(error)
        })
        })
      )
  }
  
  export function editProfileInfo (id, user) {
    const data = {
      id: id,
      user: user
    }
    return(
      new Promise(async(res, rej) =>{
        fetch("https://radiant-gorge-42555.herokuapp.com/editProfileInfo",{
          method: "POST",
          headers: {
            "Content-Type" : "application/json"
            },
          body: await JSON.stringify(data),
        }).then(async (data) => {
          if(data.status == 200){
            res(data.json())
          }else{
            rej(data.status)
          }
        }).catch(error =>{
          rej(error.json())
        })
      })
    )
  }
  
  export function editAddress (id, address) {
    const data = {
      id: id,
      address: {
        line1: address.line1,
        postal_code: address.postal_code,
        city: address.city,
        state: address.state
      }
    }
    console.log(data)
    return(
      new Promise(async(res, rej) =>{
        fetch("https://radiant-gorge-42555.herokuapp.com/editAddress",{
          method: "POST",
          headers: {
            "Content-Type" : "application/json"
            },
          body: await JSON.stringify(data),
        }).then((data) => {
          res(data.json())
        }).catch((error) =>{
          rej(error)
        })
      })
    )
  }
  
  export function getCurrencys (id) {
    const data = {
      id : id
    }
    return (
      new Promise (async (res, rej) => {
        fetch("https://radiant-gorge-42555.herokuapp.com/getCurrencys", {
          method: "POST",
          headers: {
              "Content-Type" : "application/json"
              },
          body: await JSON.stringify(data),
        }).then((data) => {
          if(data.status === 400){
            rej(400)
          }else{
            res(data.json())
          }
        }).catch(error => { rej(error) })
      })
    )
  }
  
  export function cellConfirmed (id) {
    const data = {
      id : id
    }
    return(
      new Promise (async (res, rej) => {
        fetch("https://radiant-gorge-42555.herokuapp.com/cellConfirmed", {
          method: "POST",
          headers: {
              "Content-Type" : "application/json"
              },
          body: await JSON.stringify(data),
        }).then((data) => {
          if(data.status === 400){
            rej(400)
          }else{
            res(data.json())
          }
        }).catch(error => { rej(error) })
      })
    )
  }
  
  export function confirmCodeWithdraw (id, code) {
    const data = {
      id : id,
      code : code
    }
    return(
      new Promise (async (res, rej) => {
        fetch("https://radiant-gorge-42555.herokuapp.com/confirmCodeWithdraw", {
          method: "POST",
          headers: {
              "Content-Type" : "application/json"
              },
          body: await JSON.stringify(data),
        }).then((data) => {
          if(data.status === 400){
            rej(400)
          }else{
            res(data.json())
          }
        }).catch(error => { rej(error) })
      })
    )
  }
  
  export function confirmCodeTransfer (id, code) {
    const data = {
      id : id,
      code : code
    }
    return(
      new Promise (async (res, rej) => {
        fetch("https://radiant-gorge-42555.herokuapp.com/confirmCodeTransfer", {
          method: "POST",
          headers: {
              "Content-Type" : "application/json"
              },
          body: await JSON.stringify(data),
        }).then((data) => {
          if(data.status === 400){
            rej(400)
          }else{
            res(data.json())
          }
        }).catch(error => { rej(error) })
      })
    )
  }

  export function deleteCard (card, id) {
    const data = {
      card : card,
      id: id
    }
    new Promise (async (res, rej) => {
      fetch("https://radiant-gorge-42555.herokuapp.com/deleteCard", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: await JSON.stringify(data)
      }).then((data) => {
        if(data.status === 400){
          rej(400)
        }
        if(data.status != 200){
          console.log(data.status)
          rej(404)
        }
        else{
          res(data.json())
        }
      }).catch(error => { rej(error) })
    })
  }

  export function SingIn (email, password) {
    const data = {
      email : email,
      password : password
    }
    return (
      new Promise (async (res, rej) => {
        fetch("https://radiant-gorge-42555.herokuapp.com/SingIn2", {
          method: "POST",
          headers: {
            "Content-Type" : "application/json"
          },
          body: await JSON.stringify(data)
        }).then((data) => {
          if(data.status === 400){
            rej(400)
          }
          if(data.status === 407){
            rej(407)
          }
          if(data.status != 200){
            console.log(data.status)
            rej(404)
          }
          else{
            res(data.json())
          }
        }).catch(error => { rej(error) })
      })
    )
  }

  export function SignUpR (email, password, name, lastName, phone, country
    , day, month, year) {
    const data = {
      email : email,
      password : password,
      name : name,
      lastName : lastName,
      phone : phone,
      country : country,
      day : day,
      month : month,
      year: year
    }
    return (
      new Promise (async (res, rej) => {
        fetch("https://radiant-gorge-42555.herokuapp.com/SingUp", {
          method: "POST",
          headers: {
            "Content-Type" : "application/json"
          },
          body: await JSON.stringify(data)
        }).then((data) => {
          if(data.status === 400){
            rej(400)
          }if(data.status != 200){
            rej(401)
          }
          else{
            res(data.json())
          }
        }).catch(error => { rej(error) })
      })
    )
  }

  export async function autentificarUser (object) {
    return(
      new Promise (async (res, rej) => {
        fetch("https://radiant-gorge-42555.herokuapp.com/autentificarGoogleUser", {
          method: "POST",
          headers: {
              "Content-Type" : "application/json"
              },
          body: await JSON.stringify(object),
        }).then(data => {
            console.log(data)
            if(data.status === 200){
              res(data.json())
            }else{
              rej(data.status)
            }
        }).catch(error => {
          console.log(error)
          rej(error)
        })
      })
    )
  }

  export async function requestCreditCard (id) {
    const data = {
      id : id
    }
    return (
      new Promise (async (res, rej) => {
        fetch("https://radiant-gorge-42555.herokuapp.com/creditCardRequest", {
          method: "POST",
          headers: {
            "Content-Type" : "application/json"
          },
          body: await JSON.stringify(data)
        }).then((data) => {
          if(data.status === 400){
            rej(400)
          }
          if(data.status != 200){
            rej(404)
          }
          else{
            res(data.json())
          }
        }).catch(error => { rej(error) })
      })
    )
  }

  export async function aceptCard (id) {
    const data = {
      id : id
    }
    return(
      new Promise (async (res, rej) => {
        fetch("https://radiant-gorge-42555.herokuapp.com/confirmCreditCard", {
          method: "POST",
          headers: {
            "Content-Type" : "application/json"
          },
          body: await JSON.stringify(data)
        }).then((data) => {
          if(data.status === 400){
            rej(400)
          }
          if(data.status != 200){
            rej(404)
          }
          else{
            res(data.json())
          }
        }).catch(error => { rej(error) })
      })
    )
  }

  export function cancelCard (cardID, id, reason) {
    const data = {
      cardID : cardID,
      id : id,
      reason : reason
    }
    return(
      new Promise(async (res, rej) => {
        fetch("https://radiant-gorge-42555.herokuapp.com/cancelCardRequest", {
          method: "POST",
          headers: {
            "Content-Type" : "application/json"
          },
          body: await JSON.stringify(data)
        }).then((data) => {
          if(data.status === 400){
            rej(400)
          }
          if(data.status != 200){
            rej(404)
          }
          else{
            res(data.json())
          }
        }).catch(error => { rej(error) })
      })
    )
  }

  export function getRecepiants (id) {
    const data = {
      id : id
    }
    return(
      new Promise(async (res, rej) => {
        fetch("https://radiant-gorge-42555.herokuapp.com/getRecepiants", {
          method: "POST",
          headers: {
            "Content-Type" : "application/json"
          },
          body: await JSON.stringify(data)
        }).then((data) => {
          if(data.status === 400){
            rej(400)
          }
          if(data.status != 200){
            rej(404)
          }
          else{
            res(data.json())
          }
        }).catch(error => { rej(error) })
      })
    )
  }

  export function resetPass (email) {
    const data = {
      email: email
    }
    return(
      new Promise(async (res, rej) => {
        fetch("https://radiant-gorge-42555.herokuapp.com/resetPass", {
          method: "POST",
          headers: {
            "Content-Type" : "application/json"
          },
          body: await JSON.stringify(data)
        }).then((data) => {
          if(data.status === 400){
            rej(400)
          }
          if(data.status != 200){
            rej(404)
          }
          else{
            res(data.json())
          }
        }).catch(error => { rej(error) })
      })
    )
  }

  export function deletRecepiant (id, email) {
    const data = {
      id: id,
      email: email
    }
    return (
      new Promise(async (res, rej) => {
        fetch("https://radiant-gorge-42555.herokuapp.com/deletRecepiant", {
          method: "POST",
          headers: {
            "Content-Type" : "application/json"
          },
          body: await JSON.stringify(data)
        }).then((data) => {
          if(data.status === 400){
            rej(400)
          }
          if(data.status != 200){
            rej(404)
          }
          else{
            res(data.json())
          }
        }).catch(error => { rej(error) })
      })
    )
  }

  export function completeGmailUser (id, user) {
    const data = {
      id: id,
      user: user
    }
    return(
      new Promise (async (res, rej) => {
        fetch("https://radiant-gorge-42555.herokuapp.com/completeGmailUser", {
          method: "POST",
          headers: {
            "Content-Type" : "application/json"
          },
          body: await JSON.stringify(data)
        }).then((data) => {
          if(data.status === 200){
            res(data.json())
          }else{
            rej(data.status)
          }
        }).catch(error => { rej(error) })
      })
    )
  }

  export function singInGoogleUser (token) {
    const data = {
      token : token
    }
    return(
      new Promise (async (res, rej) => {
        fetch("https://radiant-gorge-42555.herokuapp.com/singInGoogleUser", {
          method: "POST",
          headers: {
            "Content-Type" : "application/json"
          },
          body: await JSON.stringify(data)
        }).then((data) => {
          if(data.status === 200){
            res(data.json())
          }else{
            rej(data.status)
          }
        }).catch(error => { rej(error) })
      })
    )
  }

