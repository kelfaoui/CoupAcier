// Démarrer express
const express = require("express");
var bodyParser = require("body-parser");
const multer = require("multer");
const serverless = require("serverless-http");
const app = express();
var session = require("express-session");
var jsonParser = bodyParser.json();
// const { Server } = require("socket.io");

// Used for session saving

const http = require("http");

// Accepter les variables d'environnement
const env = require("dotenv").config();

// Json Web Token
const jwt = require("jsonwebtoken");

// Importer les routes
const GuestsRouter = require("./routers/Guests");
const userModel = require("./models/User");
const UsersRouter = require("./routers/Users");
const EmployesRouter = require("./routers/Employes");
const ProductsRouter = require("./routers/Products");
const EmailRouter = require("./routers/Email");

const AuthRouter = require("./routers/Auth");
const ProviderDeliveriesRouter = require("./routers/ProviderDeliveries");
const UploadRouter = require("./routers/Upload");
const ClientDeliveriesRouter = require("./routers/ClientDeliveries");
const ClientsRouter = require("./routers/Clients");
const ProvidersRouter = require("./routers/Providers");
const OrdersRouter = require("./routers/Orders");
const InvoicesRouter = require("./routers/Invoices");

// Les controllers
const AuthController = require("./controllers/AuthController");

// Les middlewares

// const session = require("./middleware/session");
const { compareSync } = require("bcrypt");

const cors = require("cors");

// Créer une application express
const path = require("path");
const WarhousesRouter = require("./routers/Warhouse");
const CategoriesRouter = require("./routers/Category");
const RolesRouter = require("./routers/Role");
const ProductOrdersRouter = require("./routers/ProductOrders");

app.use(express.json());

app.set("trust proxy", 1);

const is_production = process.env.IS_PRODUCTION === "yes" ? true : false;

/*
app.use(
  cors({
    origin: "*",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
); */

app.use(cors())

const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 30,
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
    sameSite: "none",
    secure: true,
    path: "/",
  },
};

// Use the express-session and cors middlewares
//app.use(cors(corsOptions));

var jsonParser = bodyParser.json();
app.use(express.json());

/* Si l'utilisateur est connecté version "Session" 

const isAuthenticated = async (req, res, next) => {
  const { user } = req.session
  if(!user)
    res.status(401).json({ message: "Unauthorized"})
  else
   next() 
}

*/
// Si l'utilisateur se connecte avec JSON WEB TOKEN
const isAuthenticated = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const authToken = authHeader && authHeader.split(" ")[1];
  if (authToken == null) return res.sendStatus(401);
  jwt.verify(authToken, process.env.AUTH_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// L'authentification utilise
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email);
  const User = {
    email: email,
    password: password,
  };
  userModel.userInDatabase(User, (result) => {
    if (result) {
      const accessToken = jwt.sign(User, process.env.AUTH_TOKEN); // Retourner le token de connexion
        res.json({ accessToken: accessToken, user_id: result.idClient});
        res.status(200).send();

     
    } else  {
      res.sendStatus(403); // Ne pas authoriser la connection
    }
  });
});

app.use("/users", UsersRouter);
app.use("/employes", isAuthenticated, EmployesRouter);
app.use("/clients", ClientsRouter);
app.use("/providers", isAuthenticated, ProvidersRouter); 
app.use("/products", ProductsRouter);
app.use("/warhouses", isAuthenticated, WarhousesRouter);
app.use("/categories", CategoriesRouter); 
app.use("/roles", isAuthenticated, RolesRouter); 
app.use("/orders", isAuthenticated, OrdersRouter);
app.use("/product-orders", isAuthenticated, ProductOrdersRouter);
app.use('/public', express.static('public'));
 
/* A récupérer dans le fichier .env de la racine du dossier "server" */
if (!is_production) {
  const port_number = process.env.PORT_NUMBER;
  app.listen(port_number, () => {
    console.log(`Le server est démarré au port : ${port_number} `);
  });
} 
 
if (is_production) {
  module.exports.handler = serverless(app);
}