import { User } from "./models";

export const fetchUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    // Optionally re-throw the error or return a fallback
    throw new Error("Failed to fetch users!");
  }
};
