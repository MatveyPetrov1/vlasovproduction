const express = require("express");
const db = require("./db");
const nodemailer = require("nodemailer");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const app = express();

app.use(express.json());

app.get("/photos", async (req, res) => {
  const photos = await db.query("SELECT * from mainphotos");
  res.json(photos.rows);
});

app.post("/form", async (req, res) => {
  const { name, contacts, content } = req.body;
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    subject: `VLASOV PRODUCTION`,
    text: `Имя: ${name}
Контакты: ${contacts},
${content}`,
  };
  const newForm = await db.query(
    "INSERT INTO form (name, contacts, content) values ($1, $2, $3) RETURNING *",
    [name, contacts, content]
  );
  transporter.sendMail(mailOptions);
  res.json(newForm.rows);
});

app.listen(PORT);
