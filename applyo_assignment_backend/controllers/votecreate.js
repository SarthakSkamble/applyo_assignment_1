import prisma from "../prismaClient.js";

const votePoll = async (req, res) => {
  try {
    const { pollId } = req.params;
    const { optionId, voterToken } = req.body;

    
    if (!optionId || !voterToken) {
      return res.status(400).json({
        message: "optionId and voterToken are required",
      });
    }

    
    await prisma.vote.create({
      data: {
        poll_id: pollId,
        option_id: optionId,
        voterToken,
      },
    });

   
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
      return res.status(404).json({
        message: "Poll not found",
      });
    }

    const result = {
      poll_id: poll.poll_id,
      question: poll.question,
      options: poll.options.map((opt) => ({
        option_id: opt.option_id,
        text: opt.text,
        votes: opt._count.votes,
      })),
    };

    
    const io = req.app.get("io");

    
    io.to(pollId).emit("pollUpdated", result);

    
    res.json(result);

  } catch (err) {
    
    if (err.code === "P2002") {
      return res.status(400).json({
        message: "You already voted",
      });
    }

    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export default votePoll;