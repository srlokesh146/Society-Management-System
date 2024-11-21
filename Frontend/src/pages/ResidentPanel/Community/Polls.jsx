import React from 'react';

const Polls = () => {
    const pollData = [
        {
            title: "Sales Deal with Toyota - Azure HF - AMS Amplify?",
            date: "01/07/2024, 10:00 AM",
            options: [
                { option: "Yes", votes: 75 },
                { option: "No", votes: 40 },
            ],
        },
        {
            title: "Sales Deal with Toyota - Azure HF - AMS Amplify?",
            date: "01/07/2024, 10:00 AM",
            options: [
                { option: "Yes", votes: 65 },
                { option: "No", votes: 35 },
            ],
        },
        {
            title: "Sales Deal with Toyota - Azure HF - AMS Amplify?",
            date: "01/07/2024, 10:00 AM",
            options: [
                { option: "Yes", votes: 50 },
                { option: "No", votes: 50 },
            ],
        },
        {
            title: "Sales Deal with Toyota - Azure HF - AMS Amplify?",
            date: "01/07/2024, 10:00 AM",
            options: [
                { option: "Yes", votes: 80 },
                { option: "No", votes: 20 },
            ],
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
            {pollData.map((poll, index) => (
                <div
                    key={index}
                    className="bg-white shadow-lg rounded-lg p-4 border border-gray-200"
                >
                    <h2 className="text-lg font-semibold mb-2">{poll.title}</h2>
                    <p className="text-sm text-gray-500 mb-4">{poll.date}</p>


                    <div className="mb-4">

                        <div className="mb-2">
                            <div className="flex justify-between mb-2">
                                <span className="text-sm">Yes</span>
                                <span className="text-sm font-semibold">{poll.options[0].votes} Votes</span>
                            </div>
                            <div
                                className="h-2 rounded-lg overflow-hidden"
                                style={{
                                    width: '100%',  
                                    background: '#D3D3D3', 
                                }}
                            >
                                <div
                                    className="bg-green-500 h-2"
                                    style={{
                                        width: `${(poll.options[0].votes / (poll.options[0].votes + poll.options[1].votes)) * 100}%`,
                                    }}
                                />
                            </div>
                        </div>


                        <div className="mb-2">
                            <div className="flex justify-between mb-2">
                                <span className="text-sm">No</span>
                                <span className="text-sm font-semibold">{poll.options[1].votes} Votes</span>
                            </div>
                            <div
                                className="h-2 rounded-lg overflow-hidden"
                                style={{
                                    width: '100%', 
                                    background: '#D3D3D3', 
                                }}
                            >
                                <div
                                    className="bg-orange-500 h-2"
                                    style={{
                                        width: `${(poll.options[1].votes / (poll.options[0].votes + poll.options[1].votes)) * 100}%`,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Polls;
