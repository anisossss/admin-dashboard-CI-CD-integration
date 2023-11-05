const Users = require("../models/userModel");

let usersInscription = [];
const addUserInscription = (userId, socketid) => {
  const target = usersInscription.find((obj) => obj.userId === userId);
  target
    ? Object.assign(target, { userId, socketid })
    : usersInscription.push({ userId, socketid });
};

const getUserInscription = (userId) => {
  return usersInscription.find((user) => user.userId == userId);
};

const deleteUserInscription = async (userId) => {
  const user = await Users.findById(userId);
  if (user) {
    user.online = false;
    user.save();
  }
  return usersInscription.filter((user) => user.userId == userId);
};

module.exports = {
  addUserInscription,
  getUserInscription,
  deleteUserInscription,
};
