import User from "../models/userModel.js";
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: 'can not find any users' });
    }
  } catch (err) {
    res.status(400).json({ message: 'error while fetching data' });
  }
};

export { getUsers };
