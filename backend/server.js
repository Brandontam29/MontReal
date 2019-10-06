let express = require("express")
let app = express()
let multer = require("multer")
let upload = multer()
let dotenv = require("dotenv")
let ObjectID = require("mongodb").ObjectID
let cors = require("cors")
let MongoClient = require("mongodb").MongoClient

dotenv.config()
app.use(cors({ credentials: true, origin: "http://localhost:8080" }))
app.use("/images", express.static(__dirname + "/images"))
const url = process.env.DB_URL

let generateUserId = () => {
  let generate_random_letter = string_length => {
    let random_string = ""
    let random_ascii = undefined
    let ascii_low = 97
    let ascii_high = 122
    for (let i = 0; i < string_length; i++) {
      random_ascii = Math.floor(
        Math.random() * (ascii_high - ascii_low) + ascii_low
      )
      random_string = random_string + String.fromCharCode(random_ascii)
    }
    return random_string
  }

  let generate_random_number = string_length => {
    let number_low = 0
    let number_high = 9
    let random_string = ""
    for (let i = 0; i < string_length; i++) {
      let new_number = Math.floor(
        Math.random() * (number_high - number_low) + number_low
      )
      JSON.stringify(new_number)
      random_string = random_string.concat(new_number)
    }
    return random_string
  }
  let generate_string_length = () => {
    return 2 * Math.floor(Math.random() * 10 + 20)
  }
  let generate = string_length => {
    return (
      generate_random_letter(string_length / 2) +
      generate_random_number(string_length / 2)
    )
  }
  return generate(generate_string_length())
}

let generateThreadId = () => {
  let generate_random_letter = string_length => {
    let random_string = ""
    let random_ascii = undefined
    let ascii_low = 97
    let ascii_high = 122
    for (let i = 0; i < string_length; i++) {
      random_ascii = Math.floor(
        Math.random() * (ascii_high - ascii_low) + ascii_low
      )
      random_string = random_string + String.fromCharCode(random_ascii)
    }
    return random_string
  }

  let generate_random_number = string_length => {
    let number_low = 0
    let number_high = 9
    let random_string = ""
    for (let i = 0; i < string_length; i++) {
      let new_number = Math.floor(
        Math.random() * (number_high - number_low) + number_low
      )
      JSON.stringify(new_number)
      random_string = random_string.concat(new_number)
    }
    return random_string
  }
  let generate_string_length = () => {
    return 2 * Math.floor(Math.random() * 30 + 50)
  }
  let generate = string_length => {
    return (
      generate_random_letter(string_length / 2) +
      generate_random_number(string_length / 2)
    )
  }
  return generate(generate_string_length())
}

app.get("/threads", (req, res) => {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err
    console.log(url, err)
    let dbi = db.db("Geo-Threads")
    dbi
      .collection("Threads")
      .find({})
      .toArray((err, threads) => {
        if (err) throw err
        db.close()
        res.send(JSON.stringify({ status: true, threads }))
      })
  })
})

app.post("/login", upload.none(), function(req, res) {
  console.log("attempt login", req.body)
  MongoClient.connect(url, (err, db) => {
    if (err) throw err
    let dbi = db.db("Geo-Threads")
    dbi
      .collection("Users")
      .findOne(
        { username: req.body.username, password: req.body.password },
        function(err, userData) {
          db.close()
          res.send(JSON.stringify({ status: true, userData }))
        }
      )
  })
})

app.post("/signup", upload.none(), function(req, res) {
  console.log("attempt signup", req.body)
  MongoClient.connect(url, (err, db) => {
    if (err) throw err
    let dbi = db.db("Geo-Threads")
    dbi.collection("Users").insertOne({
      userId: generateUserId(),
      username: req.body.username,
      password: req.body.password,
      name: "--insert name--",
      bio: "Live Love Laugh",
      description: "Hello. I am new here.",
      pic: "/blank-profile.png"
    })
    res.send("signup successful")
  })
})

app.post("/modify-profile", upload.none(), function(req, res) {
  console.log("modify profile", req.body)
  MongoClient.connect(url, (err, db) => {
    if (err) throw err
    let dbi = db.db("Geo-Threads")
    dbi.collection("Users").updateOne(
      { userId: req.body.userId },
      {
        $set: {
          userId: req.body.userId,
          username: req.body.username,
          password: req.body.password,
          name: req.body.name,
          bio: req.body.bio,
          description: req.body.description,
          pic: req.body.pic
        }
      }
    )
    db.close()
    res.send("profile updated")
  })
})

app.post("/uploadFile", upload.single("photo"), (req, res, next) => {
  console.log(req.body.file)
  const file = req.body.file
  if (!file) {
    const error = new Error("Please upload a file")
    error.httpStatusCode = 400
    return next(error)
  }
  console.log("THE UPLOADED FILE", file)
  res.send(file)
})

app.post("/otheraccount", upload.none(), (req, res) => {
  console.log(req.body._id)
  MongoClient.connect(url, (err, db) => {
    if (err) throw err
    let dbi = db.db("Geo-Threads")
    dbi
      .collection("Users")
      .findOne({ userId: req.body.userId }, function(err, otherAccountData) {
        db.close()
        res.send(JSON.stringify({ status: true, otherAccountData }))
      })
  })
})

app.get("/threads/:id", upload.none(), function(req, res) {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err
    let dbi = db.db("Geo-Threads")
    dbi
      .collection("Threads")
      .findOne({ threadId: req.params.id }, function(err, thread) {
        db.close()
        res.json({ thread })
      })
  })
})

app.get("/authors/:id", upload.none(), function(req, res) {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err
    let dbi = db.db("Geo-Threads")
    dbi
      .collection("Users")
      .findOne({ userId: req.params.id }, function(err, userData) {
        db.close()
        res.json({ userData })
      })
  })
})

app.post("/create-thread", upload.none(), function(req, res) {
  console.log("posting thread", req.body)
  MongoClient.connect(url, (err, db) => {
    if (err) throw err
    let dbi = db.db("Geo-Threads")
    dbi.collection("Threads").insertOne({
      authorId: req.body.userId,
      threadId: generateThreadId(),
      url: req.body.url,
      location: req.body.location,
      title: req.body.title,
      description: req.body.description,
      comments: []
    })
    res.send("thread created")
  })
})

app.post("/commentor", upload.none(), function(req, res) {
  console.log("finding commentor names", req.body)
  MongoClient.connect(url, (err, db) => {
    if (err) throw err
    let dbi = db.db("Geo-Threads")
    dbi
      .collection("Users")
      .findOne({ userId: req.body.commentor }, function(err, userData) {
        db.close()
        res.send(JSON.stringify({ status: true, userData }))
      })
  })
})

app.post("/authors", upload.none(), function(req, res) {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err
    let dbi = db.db("Geo-Threads")
    dbi
      .collection("Users")
      .findOne({ userId: req.body.authorId }, function(err, userData) {
        db.close()
        res.send(JSON.stringify({ status: true, userData }))
      })
  })
})

app.post("/new-comment", upload.none(), function(req, res) {
  console.log("new comment", req.body)
  MongoClient.connect(url, (err, db) => {
    if (err) throw err
    let dbi = db.db("Geo-Threads")
    dbi.collection("Threads").update(
      { threadId: req.body.currentThread },
      {
        $push: {
          comments: {
            commentorName: req.body.commentorName,
            commentorId: req.body.commentorId,
            comment: req.body.newComment,
            commentId: ObjectID(),
            replies: []
          }
        }
      }
    )
    res.send("new comment uploaded")
    console.log("new comment posted")
  })
})

app.post("/new-reply", upload.none(), function(req, res) {
  console.log("REPLY REQ.BOD ", req.body)
  console.log("OBJECT ID FUNCTION ON REQ.BOD", ObjectID(req.body.commentId))
  MongoClient.connect(url, (err, db) => {
    if (err) throw err
    let dbi = db.db("Geo-Threads")
    dbi.collection("Threads").update(
      {
        threadId: req.body.currentThread,
        "comments.commentId": ObjectID(req.body.commentId)
      },
      {
        $push: {
          "comments.$.replies": {
            replierName: req.body.replierName,
            replierId: req.body.replierId,
            reply: req.body.newReply,
            replyId: ObjectID()
          }
        }
      }
    )
    res.send("new reply uploaded")
    console.log("new reply posted")
  })
})

app.listen(4000)
