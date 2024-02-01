import prisma from "../../client";
import bcrypt from "bcrypt"
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Assuming the request body contains the user data
      const { name, email,passwordString } = req.body;
      const password= await bcrypt.hash(passwordString,10)
      const user = await prisma.users.create({
        data: {
          name,
          email,
          password,
        },
      });

      res.status(201).json({ user });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
