const { prisma } = require('../prisma/prisma-client');

const FollowController = {
  followUser: async (req, res) => {
    const { followingId } = req.body;
    const userId = req.user.userId;

    if (followingId === userId) {
      return res.status(400).json({ error: 'Вы не можете подписаться на самого себя' });
    }

    try {
      const existingFollow = await prisma.follows.findFirst({
        where: {
          AND: [{ followerId: userId }, { followingId }],
        },
      });

      if (existingFollow) {
        return res.status(400).json({ error: 'Подписка уже существует' });
      }

      await prisma.follows.create({
        data: {
          follower: { connect: { id: userId } },
          following: { connect: { id: followingId } },
        },
      });

      res.status(201).json({ message: 'Подписка успешно создана!' });
    } catch (error) {
      console.error('Error in followUser', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  unFollowUser: async (req, res) => {
    res.send('unFollowUser');
  },
};

module.exports = FollowController;
