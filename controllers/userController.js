const User = require('../models/User');
const bcrypt = require('bcrypt'); // for password hashing

// Signup controller
exports.createUser = async (req, res) => {
    try {
        const { name, username, password, confirm_password } = req.body;
        
        // Confirm password match
        if (password !== confirm_password) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email: username,
            password: hashedPassword,
            role: 'user'
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

/////////////////////////////////////////////////////////////////////////////////////////

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ success: false, message: "Invalid username or password." });
        }
        // Set session data
        req.session.user = user;

        // Store user ID and role in session data
        req.session.user = { id: user._id, role: user.role }; // Saving user ID and role in session

        // Check user role and set redirect path accordingly
        // const redirectPath = user.role === "user" ? "/user" : "/dashboard";
        const redirectPath = user.role === "admin" ? "/dashboard" : "/user";

        // Send JSON with redirect path
        res.status(200).json({ success: true, redirect: redirectPath });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

//////////////////////////////////////////////////////////////////////////////////////

// Signin controller
exports.signInUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const user = await User.findOne({ email: username });
        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        
        // Set session or token here if needed
        res.status(200).json({ message: "Login successful!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.signIn = async (req, res) => {  
res.render('Signin');
}

// exports.login = async (req, res) => {
//     try {
//         const { username, password } = req.body;
        
//         const user = await User.findOne({ username: username });
//         if (!user) {
//             return res.status(200).json({ success: false, message: "Invalid username or password" });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(200).json({ success: false, message: "Invalid username or password" });
//         }
        
//         // Check user role and set redirect path accordingly
//         const redirectPath = user.role === "user" ? "/user" : "/dashboard";
//         res.status(200).json({ success: true, message: "Login successful!", redirect: redirectPath });
        
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Server error" });
//     }
// };





exports.signup = async (req, res) => {  
    res.render('signup');
    }


exports.register_user = async (req,res) => {
    console.log("the contenet: ",req.body);
   try {
        const { name, username, password, confirm_password } = req.body;

        // Basic validation
        if (password !== confirm_password) {
            return res.status(400).send({
                success: false,
                message: "Passwords do not match."
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: "Username already taken."
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            username,
            password: hashedPassword,
            role:"user"
        });

        // Save the user to the database
        await newUser.save();

        res.send({
            success: true,
            message: "User registered successfully!"
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send({
            success: false,
            message: "Server error. Please try again later."
        });
    }
}   
 
