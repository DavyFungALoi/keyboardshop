import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin USer",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Obiwan Kenobi",
    email: "highground@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Darth Maul",
    email: "robolegs@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
];

export default users