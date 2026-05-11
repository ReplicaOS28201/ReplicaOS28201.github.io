export default function getUser(user) {
  if (!user) {
    return { name: "anonymous" };
  }

  if (typeof user === "string") {
    return { name: user };
  }

  return { name: user.name ?? "anonymous" };
}
