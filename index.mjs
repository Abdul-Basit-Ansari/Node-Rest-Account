import express from "express"
import cors from "cors"
import { nanoid } from 'nanoid'


const app = express();
app.use(express.json());
app.use(cors());


const port = process.env.PORT || 3000;


let users = [];

app.post("/signup", (req, res) => {
  
  let body = req.body;

  if (body.firstName === null || body.lastName === null || body.email === null || body.password === null) {
    res.send(
      `Sorry! Some Thing Went Wrong.....`
    );
    return;
  }

  let found = false;

  for (let i = 0; i < users.length; i++) {
    if (users[i].email === body.email) {
      found = true;
      break;
    }
  }
  if (found === true) {
    res.send({
      message: `email ${body.email} already exist.`
    });
    return;
  }


  let newUser = {
    userId: nanoid(),
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: body.password
  }

  users.push(newUser);

  res.send({ message: "user is created" });
});

app.post("/signin", (req, res) => {

  let body = req.body;

  if (body.email === null || body.password === null) {
    res.send(
      `Sorry Some Thing Went Wrong`
    );
    return;
  }

  let found = false;

  for (let i = 0; i < users.length; i++) {
    if (users[i].email === body.email && users[i].password === body.password) {

      found = true;
      res.send({
        firstName: users[i].firstName,
        lastName: users[i].lastName,
        email: users[i].email,
        message: "login successful",
      })
      return;

    } 
    // else {

    //   res.send({
    //     message: "Can't Found Your Accont"
    //   })
    //   return;
    // }
  }


  if (found === false) {
    res.send({
      message: "User Not Found"
    })
    return;
  }
})



app.get("/users", (req, res) => {
  res.send(users)

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})