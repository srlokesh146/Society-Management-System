
const User = require("../models/user.schema");
const fast2sms = require('fast-two-sms');
const otpGnerator = require("otp-generator")
const twilio = require("twilio")
const crypto = require('crypto');
const senData = require("../config/mail");
const { hash } = require("../utils/hashpassword");
const { compare } = require("../utils/compare");
const { generateToeken } = require("../utils/GenerateToken");
const accountsid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = new twilio(accountsid, authToken)
const bcrypt=require("bcryptjs")

exports.signup = async (req, res) => {
    try {
        const { FirstName, LastName, Email, Phone, Country, State, City, select_society, password, Cpassword, } = req.body;
        if (!FirstName || !LastName || !Email || !Phone || !Country || !State || !City || !select_society || !password || !Cpassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(Email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email"
            })
        }
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "password must be at letest 6 characters"
            })
        }
        if (Cpassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: "password must be at letest 6 characters"
            })
        }
        const existingUserByEmail = await User.findOne({ Email: Email })
        if (existingUserByEmail) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            })
        }

        if (password !== Cpassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        const hashpassword = await hash(password)
        const user = await User.create({
            FirstName,
            LastName,
            Email,
            Phone,
            Country,
            State,
            City,
            select_society,
            password: hashpassword,
            Cpassword: hashpassword,
        })
        if (user) {
            res.status(200).json({
                success: true,
                message: "User Registration Completed..."
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server error"
        })

    }
}
exports.login = async (req, res) => {
    try {
        const { EmailOrPhone, password } = req.body;


        if (!EmailOrPhone || !password) {
            return res.status(400).json({
                success: false,
                message: "Email/Phone and password are required"
            });
        }


        let query = {};
        if (EmailOrPhone.includes('@')) {
            query = { Email: EmailOrPhone };  // It's an email
        } else {
            query = { Phone: EmailOrPhone };  // It's a phone number
        }

        // Find user by either email or phone
        const user = await User.findOne(query);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User is not registered"
            });
        }

        // Validate password
        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Generate token (JWT)
        generateToeken(user._id, res);

        return res.status(200).json({
            success: true,
            message: "User logged in successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
exports.logout = async (req, res) => {
    try {

        res.clearCookie("society-auth", {
            path: '/',
            httpOnly: true,
            sameSite: 'Strict',
            secure: process.env.NODE_ENV !== 'development',
        });


        return res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
exports.SendOtp = async (req, res) => {
    try {
        const { EmailOrPhone } = req.body;
        const otp = otpGnerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
        const cdate = new Date();


        let user;
        if (EmailOrPhone.includes('@')) {

            user = await User.findOne({ Email: EmailOrPhone });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "Email not registered"
                });
            }

            await User.findOneAndUpdate(
                { Email: EmailOrPhone },
                { otp, otpExpiration: new Date(cdate.getTime()) },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );

            // Send OTP via email
            senData(user.Email, "Forgot your password", otp)

            return res.status(200).json({
                success: true,
                message: "OTP sent successfully to email"
            });

        } else {

            user = await User.findOne({ Phone: EmailOrPhone });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "Mobile number not registered"
                });
            }

            await User.findOneAndUpdate(
                { Phone: EmailOrPhone },
                { otp, otpExpiration: new Date(cdate.getTime()) },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );


            await twilioClient.messages.create({
                body: `Your Forgot Password OTP is ${otp}`,
                to: EmailOrPhone, // Phone number
                from: process.env.TWILIO_PHONE_NUMBER
            });

            return res.status(200).json({
                success: true,
                message: "OTP sent successfully to phone number"
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
// exports.verifyOtp = async (req, res) => {
//     try {
//         const { EmailOrPhone, otp } = req.body;

//         // Find user by email or phone
//         let user;
//         if (EmailOrPhone.includes('@')) {
//             user = await User.findOne({ Email: EmailOrPhone });
//         } else {
//             user = await User.findOne({ Phone: EmailOrPhone });
//         }

//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found"
//             });
//         }

//         const currentDate = new Date();
//         console.log("OTP Expiration:", user.otpExpiration);
//         console.log("Current Date:", currentDate);

//         // Check if OTP matches
//         if (user.otp !== otp) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid OTP"
//             });
//         }

//         // Check if OTP has expired
//         if (currentDate > user.otpExpiration) {
//             return res.status(400).json({
//                 success: false,
//                 message: "OTP has expired"
//             });
//         }

//         // OTP is valid, proceed with password reset or login
//         return res.status(200).json({
//             success: true,
//             message: "OTP verified successfully"
//         });

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error"
//         });
//     }
// };
exports.verifyOtp = async (req, res) => {
    try {
      
        const { EmailOrPhone, otp } = req.body;

       
        let user;

        
        if (EmailOrPhone.includes('@')) {
            //by mail
            user = await User.findOne({ Email: EmailOrPhone });
        } else {
           //by phone
            user = await User.findOne({ Phone: EmailOrPhone });
        }

        // Check if user exists in the database
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
    
        if (user.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        // if (currentDate > user.otpExpiration) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "OTP has expired"
        //     });
        // }

        
        return res.status(200).json({
            success: true,
            message: "OTP verified successfully"
        });

    } catch (error) {
        // Log any errors for debugging
        console.log(error);

        
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
exports.ResetPassword = async (req, res) => {
    try {
        const { new_pass, confirm_pass } = req.body;
        const id = req.params.id;

        if (new_pass.length < 6) {
            return res.status(400).json({
                success: false,
                message: "password must be at letest 6 characters"
            })
        }
        if (confirm_pass.length < 6) {
            return res.status(400).json({
                success: false,
                message: "password must be at letest 6 characters"
            })
        }
        const finddata = await User.findById(id);
        if (!finddata) {
            return res.status(404).json({ message: "User not found" });
        }

      
        if(new_pass!=confirm_pass){
            return res.status(400).json({
                success:false,
                message:"Password and confirm password are not match"
            })
        }
       
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(new_pass, salt);

      
        finddata.password = hashedPassword; 
        finddata.Cpassword=hashedPassword;

       
        await finddata.save();

        return res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};
exports.UpdateProfile= async(req,res)=>{
    try {
        const { FirstName, LastName, Email, Phone, Country, State, City, select_society, password, Cpassword, } = req.body;
        if (!FirstName || !LastName || !Email || !Phone || !Country || !State || !City || !select_society || !password || !Cpassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(Email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email"
            })
        }
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "password must be at letest 6 characters"
            })
        }
        if (Cpassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: "password must be at letest 6 characters"
            })
        }
       
        if (password !== Cpassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        const hashpassword = await hash(password)
        const user = await User.findByIdAndUpdate(req.params.id,{
            FirstName,
            LastName,
            Email,
            Phone,
            Country,
            State,
            City,
            select_society,
            password: hashpassword,
            Cpassword: hashpassword,
        })
        if (user) {
            res.status(200).json({
                success: true,
                message: "User  Profile Updated..."
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server error"
        })

    }
}
exports.FindByIdProfile= async(req,res)=>{
    try {
        const find=await User.findById(req.params.id, { otp: 0, otpExpiration: 0 });
        if(!find){
            return res.status(400).json({
                success:false,
                message:"No Data Found"
            })
        }
        return res.status(200).json({
            success:true,
            Profile:find
        })
    } catch (error) {
        console.log("Error in logout controller", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}