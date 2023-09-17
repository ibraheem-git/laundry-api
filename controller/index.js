const User = require('../models/user');

const getAllUsers = async (req ,res) => {
    try{
        const users = await User.find();
        return res.status(200).json({ success: true, message: "Users has been retrieved", data: users });
    }catch(err) {
        res.json(err)
    }
};


const getOne = async (req ,res) => {
    try{
        const { id } = req.query;
        const user = await User.findById(id);
        return res.status(200).json({ success: true, message: "User has been retrieved", data: user });
    }catch(err) {
        res.json(err)
    }
};

const signUp = async(req, res) => {
    const { email, name, password, phone } = req.body;
    if(!email || !name || !password || !phone) {
        return res.status(400).json({ success: false, message: "All fields is required" });
    }
    const userExist = await User.findOne({ email });
    if(userExist) {
        return res.status(400).json({ success: false, message: "Email already exist" });
    }
    const user = {
        name,
        email,
        password,
        phone
    };
    try{
        await User.create(user);
        return res.status(200).json({ success: true, message: "Your account has been created" });
    } catch(err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

const updateUser = async (req, res) =>  {
    const {name, email, phone, password} = req.body;
    const {user_id} = req.params;
    if (!user_id) {
        return res.status(400).json({ success: false, message: "Input correct details"})
    }
 
   try {
        const updatedUser = await User.findByIdAndUpdate(user_id,
            { name, email, phone, password });
            return res.status(200).json({ success: true, message: "Account Updated", data: updatedUser})
        
       } catch (err) {
            return res.status(500).json({ success: false, message: err.message})
       } 
}

const deleteUser = async (req, res) => {
    const {user_id} = req.params;
    if (!user_id) {
        return res.status(400).json({ success: false, message: "user not exist"})
    }
    try {
   const removedOne = await User.deleteOne({_id: user_id});
   
    return res.status(200).json({ success: true, message: "user removed", data: removedOne})

        
    } catch (err) {
        return res.status(500).json({success: false, message: err.message})
        
    }

   
}

module.exports = {
    signUp,
    getAllUsers,
    getOne,
    updateUser,
    deleteUser
}