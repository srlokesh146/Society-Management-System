import React from "react";

const Member = ({ member }) => {
  console.log(member);
  return (
    <div className="bg-white p-6  mt-6 rounded-lg shadow-sm">
      <h1 className="font-semibold font-lg">Member : {member.length}</h1>
      <div className="grid grid-cols-1  mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {member.length > 0 ? (
        member.map((member) => (
          <div key={member._id} className="border border-grey-800 rounded-lg">
            <div className="bg-[#5678E9]  text-white p-4 flex justify-between items-center rounded-t-lg">
              <h2 className="text-sm sm:text-base font-semibold">
                {member.Full_name}
              </h2>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm sm:text-base text-gray-500">
                  <span className="font-sm w-24">E-Mail</span>
                  <p className="text-black text-[15px] ml-12">
                    <span>{member.Email_address}</span>
                  </p>
                </div>
                <div className="flex items-center text-sm sm:text-base text-gray-500">
                  <span className="font-sm w-32">Phone Number</span>
                  <p className="text-black ml-auto">
                    <span>+91 {member.Phone_number}</span>
                  </p>
                </div>
                <div className="flex items-center text-sm sm:text-base text-gray-500">
                  <span className="font-sm w-32">Age</span>
                  <p className="text-black ml-auto">
                    <span>{member.Age}</span>
                  </p>
                </div>
                <div className="flex items-center text-sm sm:text-base text-gray-500">
                  <span className="font-sm w-24">Gender</span>
                  <p className="text-black ml-52">
                    <span>{member.Gender}</span>
                  </p>
                </div>
                <div className="flex items-center text-sm sm:text-base text-gray-500">
                  <span className="font-sm w-24">Relation</span>
                  <p className="text-black ml-52">
                    <span>{member.Relation}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <tr>
          <td colSpan='7' className='text-center py-4 text-gray-500'>
            No data found
          </td>
        </tr>
      )}
      </div>
    </div>
  );
};

export default Member;
