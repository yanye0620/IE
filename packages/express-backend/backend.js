import express from "express";
import cors from "cors";

const app = express();
const port = 8000;
const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

const findUserByNameNJob = (name, job) => {
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
  );
};

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

app.use(cors());
app.use(express.json());

/*app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});
*/

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const user = findUserById(userId);

  if (user) {
    users.users_list = users.users_list.filter(user => user.id !== userId);
    res.status(200).send(`User with ID ${userId} has been deleted.`);
  } else {
    res.status(404).send(`User with ID ${userId} not found.`);
  }
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (name !== undefined && job !== undefined) {
    let results = findUserByNameNJob(name, job);
    results = { users_list: results };
    res.send(results);
  } else if (name !== undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(users);
  } else {
    res.send(users);
  }
});

app.post('/users', (req, res) => {
  const user = req.body;
  if (user) {
    user.push(user);
    res.status(201).send(`User added successfully.`);
  } else {
    res.status(400).send(`Invalid user.`)
  }
});


app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});