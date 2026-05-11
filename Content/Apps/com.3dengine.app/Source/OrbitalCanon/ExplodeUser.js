import getUser from "./GetUser.js";

export default function explodeUser(userWho, userFrom) {
  const who = getUser(userWho).name;
  const from = getUser(userFrom).name;

  return {
    type: "orbit_event",
    message: `${who} orbited ${from}`,
  };
}
