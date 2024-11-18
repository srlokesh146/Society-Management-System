import React from "react";

const Member = () => {
    // Dummy data for members
    const members = [
        {
            id: 1,
            name: "John Doe",
            email: "johndoe@example.com",
            phone: "+91 98765 43210",
            age: 30,
            gender: "Male",
            relation: "Brother",
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "janesmith@example.com",
            phone: "+91 98765 12345",
            age: 25,
            gender: "Female",
            relation: "Sister",
        },
        {
            id: 3,
            name: "David Johnson",
            email: "david.johnson@example.com",
            phone: "+91 99876 54321",
            age: 40,
            gender: "Male",
            relation: "Father",
        },
        {
            id: 4,
            name: "David Johnson",
            email: "david.johnson@example.com",
            phone: "+91 99876 54321",
            age: 40,
            gender: "Male",
            relation: "Father",
        },
    ];

    return (
        <div className="bg-white p-6  mt-6 rounded-lg shadow-sm">
            <h1 className="font-semibold font-lg">Member : (04)</h1>
        <div className="grid grid-cols-1  mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {members.map((member) => (
            
                <div key={member._id} className="border border-grey-800 rounded-lg">
                
                    <div className="bg-[#5678E9]  text-white p-4 flex justify-between items-center rounded-t-lg">
                        <h2 className="text-sm sm:text-base font-semibold">{member.name}</h2>
                    </div>
                    <div className="p-4">
                        <div className="space-y-2">
                            <div className="flex items-center text-sm sm:text-base text-gray-500">
                                <span className="font-sm w-24">E-Mail</span>
                                <p className="text-black text-[15px] ml-12">
                                    <span>{member.email}</span>
                                </p>
                            </div>
                            <div className="flex items-center text-sm sm:text-base text-gray-500">
                                <span className="font-sm w-32">Phone Number</span>
                                <p className="text-black ml-auto">
                                    <span>{member.phone}</span>
                                </p>
                            </div>
                            <div className="flex items-center text-sm sm:text-base text-gray-500">
                                <span className="font-sm w-32">Age</span>
                                <p className="text-black ml-auto">
                                    <span>{member.age}</span>
                                </p>
                            </div>
                            <div className="flex items-center text-sm sm:text-base text-gray-500">
                                <span className="font-sm w-24">Gender</span>
                                <p className="text-black ml-52">
                                    <span>{member.gender}</span>
                                </p>
                            </div>
                            <div className="flex items-center text-sm sm:text-base text-gray-500">
                                <span className="font-sm w-24">Relation</span>
                                <p className="text-black ml-52">
                                    <span>{member.relation}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
    
    );
};

export default Member;
