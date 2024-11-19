import React from 'react'

const ResidentAnnouncement = [
    {
        id: 1,
        name: "community initiavties",
       announcementdate: "11/01/2024",
        announcementtime: "10:15 AM",
           description:"The celebration of Ganesh Chaturthi involves the instollation of clay idols of Ganesha in."
      

    },
    {
        id: 2,
        name: "community initiavties",
       announcementdate: "11/01/2024",
        announcementtime: "10:15 AM",
           description:"The celebration of Ganesh Chaturthi involves the instollation of clay idols of Ganesha in."
      

    },
    {
        id: 3,
        name: "community initiavties",
       announcementdate: "11/01/2024",
        announcementtime: "10:15 AM",
           description:"uThe celebration of Ganesh Chaturthi involves the instollation of clay idols of Ganesha in."
      

    },
    {
        id: 4,
        name: "community initiavties",
       announcementdate: "11/01/2024",
        announcementtime: "10:15 AM",
           description:"The celebration of Ganesh Chaturthi involves the instollation of clay idols of Ganesha in."
      

    },
 
   

];
function AnnouncementDetails() {
  return (
    <div>
        <div className="bg-white p-6  mt-6 rounded-lg shadow-sm">
                <div>
                <h1 className='font-semibold font-md'>Announcement Details</h1>
                </div>
                <div className="grid grid-cols-1  mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {ResidentAnnouncement.map((ResidentAnnouncement) => (

                        <div key={ResidentAnnouncement._id} className="border border-grey-800 rounded-lg">

                            <div className="bg-[#5678E9] text-white p-4  justify-between items-center rounded-t-lg">
                                <h2 className="text-sm sm:text-base font-semibold">{ResidentAnnouncement.name}</h2>
                            </div>
                            <div className="p-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-sm sm:text-base text-gray-500">
                                        <span className="font-sm ">Announcement Date</span>
                                        <p className="text-black text-[15px]">{ResidentAnnouncement.announcementdate}</p>
                                    </div>
                                    
                                    <div className="flex justify-between items-center text-sm sm:text-base text-gray-500">
                                        <span className="font-sm ">Announcement Time</span>
                                        <p className="text-black">{ResidentAnnouncement.announcementtime}</p>
                                    </div>
                                    <div className=" justify-between items-center text-sm sm:text-base text-gray-500">
                                        <span className="font-sm ">Description</span>
                                        <p className="text-black text-[14px] mt-2">{ResidentAnnouncement.description}</p>
                                    </div>
                                    <div className="border-b border-[#F4F4F4] mb-[20px]"></div>
                                   
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    </div>
  )
}

export default AnnouncementDetails