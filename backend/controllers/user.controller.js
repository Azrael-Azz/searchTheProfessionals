import User from "../models/user.model.js";

export async function getAllUsers(req, res) {
    try {
        // const users = await User.find({}, 'username email');
        // const userList = users.map(user => ({
        //     username: user.username,
        //     email: user.email
        //   }));

        // res.json(userList);
          
        
        //  OR TO GET JUST USERNAME
         const users = await User.find({}, 'username'); // Only select 'username' field
         const usernames = users.map(user => user.username);
         res.json(users);



        //  OR TO GET ALL THE DATA OF USERS
        //  const users = await User.find(); // Only select 'username' field
        //  res.json(users);


    } catch (e) {
        return res.status(500).json(e);
    }
}


export async function searchUsers(req, res) {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ message: "Search query is required" });
    }

    try {
        const users = await User.find({ 
            username: { $regex: query, $options: "i" } 
        }).select("username -_id"); //to exclude id and only show username

        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

export async function getUserProfile(req, res) {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username }).select('username email createdAt');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}