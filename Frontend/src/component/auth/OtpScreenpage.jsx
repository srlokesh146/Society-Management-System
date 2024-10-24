import React from 'react';
import passwordimage from '../../assest/images/passwordimage.png';
import { AiOutlineClockCircle } from 'react-icons/ai';
import Logo from '../Logo';

const OtpScreenpage = () => {
    return (
        <div className="flex flex-col lg:flex-row h-screen overflow-hidden bg-cover bg-center bg-image relative">
            <div className="flex flex-col bg-[#F6F8FB] w-full lg:w-1/2 z-10">
                <div className="pt-[60px] flex justify-start">
                    <Logo logocss />
                </div>
                <div className="flex-grow flex items-center justify-center mt-[93px] mb-[249px] lg:mx-auto z-10">
                    <img
                        src={passwordimage}
                        alt="OTP"
                        className="w-full h-auto max-w-[561px] object-contain sm:max-w-[480px] max-sm:max-w-[320px] max-md:max-w-[561px] mx-lg:mx-w-[500px]"
                    />
                </div>
            </div>

            <div className="flex items-center justify-center w-full lg:w-1/2 z-20 relative">
                <div className="pt-[20px] pb-[20px] px-[5%] lg:px-[20px] w-full max-w-[630px] rounded-lg z-30 relative">
                    <h3 className="text-gray-700 text-[18px] font-semibold mb-[56px] ms-[40px] text-start">
                        3. OTP Screen (Unfill)
                    </h3>
                    <div className="custom-shadow px-[50px] pt-[50px] pb-[85px] w-full text-start bg-white rounded-[15px] z-40 relative">
                        <h2 className="text-[34px] font-semibold mb-[10px] text-gray-700">
                            Enter OTP
                        </h2>
                        <p className="text-gray-600 text-[14px] mb-3">
                            Please enter the 6-digit code sent to your phone number.
                        </p>

                        <div className="flex mb-[20px] justify-start space-x-2">
                            {Array(6).fill(0).map((_, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    value={0}
                                    className="w-[14%] min-w-[40px] h-[60px] border border-[#D3D3D3] rounded-[10px] text-center text-[24px] text-[#D3D3D3] focus:outline-none"
                                />
                            ))}
                        </div>

                        <div className="flex items-center justify-between mb-[20px]">
                            <div className="flex items-center">
                                <AiOutlineClockCircle className="text-gray-600 mr-1" />
                                <span className="text-gray-600">00:30</span>
                            </div>
                            <button className="text-[#A7A7A7] hover:text-[#000]">
                                Resend OTP
                            </button>
                        </div>

                        <button className="w-full py-[12px] rounded bg-[#F6F8FB] text-[#A7A7A7] leading-7 ">
                            Verify
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtpScreenpage;
