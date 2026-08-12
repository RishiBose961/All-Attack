import { prisma } from "../db.js";
import { randomBytes } from "crypto";
import { hashPassword } from "../utils/hashpassword.util.js";

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).json("All fields are required.");
        }
        const existingUser = await prisma.userInjection.findUnique({
            where: { email },
        });
        if (existingUser) {
            return res.status(400).json("User already exists." );
        }
        const generateUniqueUsername = (name) => {
            const randomNumber = Math.floor(1000 + Math.random() * 9000);
            const sanitizedName = name.replace(/\s+/g, "");
            return `@${sanitizedName}${randomNumber}`;
        };
        const salt = randomBytes(16).toString("hex");
        // const hashedPassword = await hashPassword(password, salt);

        const usernames = generateUniqueUsername(name);

        // Create the user in the database
        const newUser = await prisma.userInjection.create({
            data: {
                username: usernames,
                first_name: name,
                last_name: null,
                avatar: `https://api.dicebear.com/9.x/dylan/svg?seed=${usernames}`,
                email,
                salt,
                password,
            },
        });

 
        return res.status(201).json({
            message: "User registered successfully.",
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                avatar: newUser.avatar,
            },
        });
    }
    catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};


export const loginUserVulnerable = async (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM "UserInjection" WHERE username = '${username}' AND password = '${password}'`;
  const users = await prisma.$queryRawUnsafe(query);
  //sql: query
  res.json({  users });
};


export const searchUsersVulnerable = async (req, res) => {
  const { username } = req.query;
  const query = `
    SELECT id, username, name, avatar
    FROM "User"
    WHERE username LIKE '%${username}%'
  `;
  console.log("SQL:", query);
  const users = await prisma.$queryRawUnsafe(query);
  res.json({ sql: query, users });
};

export const updateNameVulnerable = async (req, res) => {
  const { id, name } = req.body;
  const query = `
    UPDATE "User" SET name = '${name}' WHERE id = ${id}
  `;
  console.log("SQL:", query);
  await prisma.$executeRawUnsafe(query);
  res.json({ sql: query, status: "updated" });
};

export const getUserByIdVulnerable = async (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT id, username, email, name, avatar,password,salt
    FROM "User"
    WHERE id = ${id}
  `;
  console.log("SQL:", query);
  const user = await prisma.$queryRawUnsafe(query);
  res.json({ sql: query, user });
};


export const checkEmailExistsVulnerable = async (req, res) => {
  const { email } = req.body;
  const query = `
    SELECT COUNT(*) as count FROM "User" WHERE email = '${email}'
  `;
  console.log("SQL:", query);
  const result = await prisma.$queryRawUnsafe(query);
  res.json({ exists: Number(result[0].count) > 0 }); // no SQL/data leaked back — only true/false
};