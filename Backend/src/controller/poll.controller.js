const Poll = require("../models/poll.model");


// Create a new poll
exports.createPoll = async (req, res) => {
    try {
        const { title,pollType, question, options } = req.body;
        console.log(req.body);
        
       
        if (
            !title ||
            !pollType ||
            !question ||
            !options 
          ) {
            return res.status(400).json({
              success: false,
              message: "All fields are required",
            });
          }

          const userType = req.user.Resident_status;

          if (userType !== 'Owner' && userType !== 'Tenante') {
            return res.status(400).json({
                success: false,
                message: "Invalid user type for creating a poll",
            });
        }

        const poll = new Poll({
            title,
            pollType,
            question,
            options: options.map(option => ({ text: option })),
            createdBy: req.user._id, 
            createdByType:userType 
        });

        await poll.save();
        return res.status(201).json({ success: true, message:"Poll created Successfully" });
    } catch (error) {
        console.error("Error creating poll:", error);
        return res.status(500).json({ success: false, message: 'Error creating poll' });
    }
};

// Get all polls
exports.getPolls = async (req, res) => {
    try {
        const polls = await Poll.find({})
            .populate('createdBy',)  
            .sort({ createdAt: -1 });

        return res.status(200).json({ success: true, polls });
    } catch (error) {
        console.error("Error fetching polls:", error);
        return res.status(500).json({ success: false, message: 'Error fetching polls' });
    }
};
