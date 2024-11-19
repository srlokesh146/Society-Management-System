import React from 'react'
import { FaImage } from 'react-icons/fa'

function Form() {
    return (
        <div>
            <div className="grid grid-cols-1 gap-6">


                {/* Profile Photo Section */}
                <div className="flex justify-start">
                    <img
                        src="https://media.istockphoto.com/id/1466995518/photo/business-woman-and-worker-portrait-at-office-desk-as-administration-executive-company-manager.jpg?s=612x612&w=0&k=20&c=NvKeG6Fh0_VVfH_N0Ka-5j8284XJhL2VTJfe6IwDkWQ="
                        alt="Profile"
                        className="w-28 h-28 rounded-full border border-gray-300"
                    />
                </div>

                {/* First Row */}
                <div className="grid grid-cols-1 md:grid-cols-5 mt-[-200px] gap-8 ml-40 items-center">
                    <div>
                        <label className="block text-md font-medium text-black">
                            Full Name
                        </label>
                        <p className="text-gray-300 font-lighter">Arlene McCoy</p>
                    </div>
                    <div>
                        <label className="block text-md font-medium text-black">
                            Phone Number
                        </label>
                        <p className="text-gray-300 font-lighter">
                            +91 98130 44537
                        </p>
                    </div>
                    <div>
                        <label className="block text-md font-medium text-black">
                            Email Address
                        </label>
                        <p className="text-gray-300 font-lighter">
                            ArleneMcCoy25@gmail.com
                        </p>
                    </div>
                    <div>
                        <label className="block text-md font-medium text-black">
                            Gender
                        </label>
                        <p className="text-gray-300 font-lighter">Male</p>
                    </div>
                    <div>
                        <button className="flex flex-col items-start w-[300px] ml-[-45px] py-3 px-4 bg-white border border-gray-300 rounded-lg">
                            {/* Icon and File Name */}
                            <div className="flex items-center gap-2">
                                <FaImage size={16} className="text-blue-500" />
                                <span className="font-lighter text-black text-[10px] truncate">
                                    Syncfusion Essential Aadharcard Front Side.JPG
                                </span>
                            </div>
                            {/* File Size on the Next Line */}
                            <span className="text-xs text-gray-500 font-lighter mt-1 ml-6">3.5 MB</span>
                        </button>


                    </div>
                </div>

                {/* Second Row */}
                <div className="grid grid-cols-1 md:grid-cols-5 mt-[-100px] gap-8  ml-40 items-center">
                    <div>
                        <label className="block text-md font-medium text-black">
                            Wing
                        </label>
                        <p className="text-gray-300 font-lighter">A</p>
                    </div>
                    <div>
                        <label className="block text-md font-medium text-black">
                            Age
                        </label>
                        <p className="text-gray-300 font-lighter">20</p>
                    </div>
                    <div>
                        <label className="block text-md font-medium text-black">
                            Unit
                        </label>
                        <p className="text-gray-300 font-lighter">1001</p>
                    </div>
                    <div>
                        <label className="block text-md font-medium text-black">
                            Relation
                        </label>
                        <p className="text-gray-300 font-lighter">Father</p>
                    </div>
                    <div>
                        <button className="flex flex-col items-start w-[300px] ml-[-45px] py-3 px-4 bg-white border border-gray-300 rounded-lg">
                            {/* Icon and File Name */}
                            <div className="flex items-center  gap-2">
                                <FaImage size={16} className="text-blue-500" />
                                <span className="font-lighter text-[10px] truncate">
                                    Adhara Card Front Side.PDF
                                </span>
                            </div>
                            {/* File Size on the Next Line */}
                            <span className="text-xs text-gray-500 font-lighter mt-1 ml-6">3.5 MB</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form