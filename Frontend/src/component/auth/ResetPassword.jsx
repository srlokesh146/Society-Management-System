import React, { useState } from "react";
import passwordimage from "../../assest/images/passwordimage.png"; 
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import Logo from "../Logo";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleToggleNewPasswordVisibility = () => {
        setShowNewPassword((show) => !show);
    };

    const handleToggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((show) => !show);
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen overflow-hidden bg-cover bg-center relative">
            <div className="flex flex-col bg-[#F6F8FB] w-full lg:w-1/2 z-10">
                <div className="pt-8 lg:pt-[60px] flex justify-start">
                    <Logo logocss />
                </div>
                <div className="flex-grow flex items-center justify-center mt-[93px] mb-[249px] lg:mx-auto z-10">
                    <img
                        src={passwordimage}
                        alt="Password Reset"
                        className="w-full h-auto max-w-[561px] object-contain sm:max-w-[480px] max-sm:max-w-[320px] max-md:max-w-[561px] mx-lg:mx-w-[500px]"
                    />
                </div>
            </div>

            <div className="flex items-center justify-center w-full lg:w-1/2 z-20">
                <div className="w-full max-w-[630px] rounded-[15px] px-4 lg:px-0">
                    <div className="custom-shadow px-4 lg:px-[50px] pt-8 lg:pt-[50px] pb-8 lg:pb-[85px] w-full text-start bg-white rounded-[15px] z-40 relative">
                        <h2 className="text-[28px] lg:text-[34px] font-semibold mb-[20px] text-[#202224]">
                            Reset Password
                        </h2>

                        <div>
                            <label className="mb-[6px] text-[14px] text-[#202224] font-semibold">
                                New Password
                            </label>
                            <div className="relative mb-[30px]">
                                <input
                                    type={showNewPassword ? 'text' : 'password'}
                                    className="w-full py-[11px] ps-[13px] pr-[9px] border border-[#D3D3D3] focus:outline-none rounded-[10px]"
                                    placeholder="Enter New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <span
                                    onClick={handleToggleNewPasswordVisibility}
                                    className="absolute right-[13px] top-[13px] cursor-pointer text-[#A7A7A7]"
                                >
                                    {showNewPassword ? (
                                        <BsFillEyeSlashFill style={{ width: '24px', height: '24px' }} />
                                    ) : (
                                        <BsFillEyeFill style={{ width: '24px', height: '24px' }} />
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className='mb-12'>
                            <label className="mb-[6px] text-[14px] text-[#202224] font-semibold">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    className="w-full py-[11px] ps-[13px] pr-[9px] border border-[#D3D3D3] focus:outline-none rounded-[10px]"
                                    placeholder="Enter Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <span
                                    onClick={handleToggleConfirmPasswordVisibility}
                                    className="absolute right-[13px] top-[13px] cursor-pointer text-[#A7A7A7]"
                                >
                                    {showConfirmPassword ? (
                                        <BsFillEyeSlashFill style={{ width: '24px', height: '24px' }} />
                                    ) : (
                                        <BsFillEyeFill style={{ width: '24px', height: '24px' }} />
                                    )}
                                </span>
                            </div>
                        </div>

                        <button
                            className="w-full py-[12px] rounded bg-[#F6F8FB] text-[#A7A7A7] font-semibold leading-7"
                        >
                            Reset Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
