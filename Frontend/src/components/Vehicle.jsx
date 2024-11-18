import React from "react";

const Vehicle = () => {
    // Dummy data for members
    const Vehicle = [
        {
            id: 1,
            name: "Two Wheelers",
            vehiclename:"splender",
           vehiclenumber:"GJ-5245"
           
        },
  
        {
            id: 2,
            name: "Four Wheelers",
            vehiclename:"Fourtuner",
           vehiclenumber:"GJ-5245"
           
        },
  
        {
            id: 3,
            name: "Two Wheelers",
            vehiclename:"splender",
           vehiclenumber:"GJ-5245"
           
        },
  
        {
            id: 4,
            name: "Four Wheelers",
           vehiclename:"Scorpio",
           vehiclenumber:"GJ-5245"
           
        },
  
    ];

    return (
        <div className="bg-white p-6  mt-6 rounded-lg shadow-sm">
            <h1 className="font-semibold font-lg">vehicle : (04)</h1>
        <div className="grid grid-cols-1  mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Vehicle.map((vehicle) => (
            
                <div key={vehicle._id} className="border border-grey-800 rounded-lg">
                
                    <div className="bg-[#5678E9]  text-white p-4 flex justify-between items-center rounded-t-lg">
                        <h2 className="text-sm sm:text-base font-semibold">{vehicle.name}</h2>
                    </div>
                    <div className="p-4">
                        <div className="space-y-2">
                            <div className="flex items-center text-sm sm:text-base text-gray-500">
                                <span className="font-sm w-24">vehicleName</span>
                                <p className="text-black text-[15px] ml-auto">
                                    <span>{vehicle.vehiclename}</span>
                                </p>
                            </div>
                            <div className="flex items-center text-sm sm:text-base text-gray-500">
                                <span className="font-sm w-32"> vehicleNumber</span>
                                <p className="text-black text-[15px] ml-auto">
                                    <span>{vehicle.vehiclenumber}</span>
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

export default Vehicle;
