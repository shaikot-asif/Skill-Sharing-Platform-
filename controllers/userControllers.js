import User from "../models/User.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //check user exist or not

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User have already registerd" });
    }

    //creating a new user
    user = await User.create({
      name,
      email,
      password,
    });
    return res.status(201).json({
      _id: user._id,
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      verified: user.verified,
      admin: user.admin,
      token: await user.generateJWT(),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
export { registerUser };
