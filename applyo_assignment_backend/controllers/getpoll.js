import prisma from "../prismaClient.js";

const getPoll = async (req, res) => {
  try {
    const { pollId } = req.params;

    const poll = await prisma.poll.findUnique({
      where: { poll_id: pollId },
      include: {
        options: {
          include: {
            _count: {
              select: { votes: true },
            },
          },
        },
      },
    });

    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    res.json({
      poll_id: poll.poll_id,
      question: poll.question,
      options: poll.options.map((opt) => ({
        option_id: opt.option_id,
        text: opt.text,
        votes: opt._count.votes,
      })),
    });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export default getPoll;