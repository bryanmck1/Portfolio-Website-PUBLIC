import express from "express";
import bodyParser from "body-parser";
import sgMail from "@sendgrid/mail";

const app = express();
const API_KEY = "SENDGRID API KEY";
sgMail.setApiKey(API_KEY);
app.use(bodyParser.json());
app.listen(process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

app.get("/", (req, response) => {
  response.render("index");
});

app.get("/cvResume", (req, response) => {
  response.render("cvResume");
});

app.get("/contact", (req, response) => {
  response.render("contact");
});

app.get("/projects", (req, response) => {
  response.render("projects");
});

app.get("/credits", (req, response) => {
  response.render("credits");
});

app.post("/contact", function (req, response) {
  const personName = req.body.name;
  const personEmail = req.body.email;
  const personSubject = req.body.subject;
  const personMessage = req.body.message;
  const message = {
    to: "EMAIL ADDRESS YOU WANT TO RECEIVE AT",
    from: "EMAIL ADDRESS YOU WANT TO SEND FROM, VERIFIED BY SENDGRID",
    subject: "Form Submit",
    text: `${personName}
      ${personEmail}
      ${personSubject}
      ${personMessage}`,
  };
  sgMail
    .send(message)
    .then((res) => {
      response.render("success");
      console.log("sent");
    })
    .catch((error) => console.log(error));
});
