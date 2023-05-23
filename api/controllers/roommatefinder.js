import RoommatePreferences from "../models/RoommatePreferences.js";
import User from "../models/User.js";

const findPotentialRoommates = async (preferences) => {
  const { userId, gender, smoking } = preferences;

  const userPreferences = await RoommatePreferences.findOne({
    where: { userId },
  });

  let potentialRoommates = await User.findAll({
    include: [{ model: RoommatePreferences, where: { gender, smoking } }],
  });

  const matchedRoommates = potentialRoommates.map((roommate) => {
    const roommatePreferences = roommate.RoommatePreferences;

    let score = 0;

    if (
      gender &&
      roommatePreferences &&
      roommatePreferences.gender === userPreferences.gender
    ) {
      score += roommatePreferences.genderWeight;
    }

    if (
      smoking &&
      roommatePreferences &&
      roommatePreferences.smoking === userPreferences.smoking
    ) {
      score += roommatePreferences.smokingWeight;
    }
    console.log(score);
    return { roommate, score };
  });

  matchedRoommates.sort((a, b) => b.score - a.score);

  return matchedRoommates.map((match) => match.roommate);
};

export const findRoommate = async (req, res) => {
  try {
    const userId = req.user.id; 

    const userPreferences = await RoommatePreferences.findOne({
      where: { userId },
    });

    if (!userPreferences) {
      return res
        .status(200)
        .json({ message: "User does not have any roommate preferences" });
    }

    const { gender, smoking } = req.query;

    if (!gender || !smoking) {
      return res
        .status(400)
        .json({ error: "Both gender and smoking preferences are required" });
    }

    const preferences = {
      userId,
      gender,
      smoking,
    };

    const matchedRoommates = await findPotentialRoommates(preferences);

    res.json(matchedRoommates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
