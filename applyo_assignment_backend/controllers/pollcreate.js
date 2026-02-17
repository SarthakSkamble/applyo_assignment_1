import prisma from "../prismaClient.js";

const createPoll = async (req, res) => {
  try {
    const { question, options } = req.body;

    // Basic validation
    if (!question || !options || options.length < 2) {
      return res.status(400).json({
        message: "Question and at least 2 options are required",
      });
    }

    // Create poll + options together
    const poll = await prisma.poll.create({
      data: {
        question,
        options: {
          create: options.map((text) => ({ text })),
        },
      },
      include: {
        options: true,
      },
    });

    return res.status(201).json(poll);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export default createPoll