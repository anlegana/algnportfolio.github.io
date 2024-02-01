import prisma from "../client";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Assuming the request body contains the user data
      const { name, email } = req.body;

      const user = await prisma.user.create({
        data: {
          name,
          email,
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
