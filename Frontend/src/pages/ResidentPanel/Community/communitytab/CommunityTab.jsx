import React, { useState } from 'react';
import OwnPolls from '../OwnPolls';
import NewPoll from '../NewPoll';
import PreviousPoll from '../PreviousPoll';

export default function CommunityTab() {
    const [activeTab, setActiveTab] = useState(0);

    const renderTabContent = () => {
        switch (activeTab) {
            case 0:
                return <OwnPolls />;
            case 1:
                return <NewPoll />;
            case 2:
                return <PreviousPoll />;
            default:
                return <OwnPolls />;
        }
    };

    return (
        <div>
            <div className="flex">
                <div
                    onClick={() => setActiveTab(0)}
                    className={`px-6 py-5 rounded-t-lg cursor-pointer text-[14px] text-[#202224] font-semibold ${activeTab === 0 ? "bg-[#FF6B07] text-white" : "bg-white py-5 border-b-2 border-[#FF6B07]"}`}
                >
                    Own polls
                </div>

                <div
                    onClick={() => setActiveTab(1)}
                    className={`px-6 py-5 rounded-t-lg cursor-pointer text-[14px] text-[#202224] font-semibold ${activeTab === 1 ? "bg-[#FF6B07] text-white" : "bg-white py-5 border-b-2 border-[#FF6B07]"}`}
                >
                    New Poll
                </div>

                <div
                    onClick={() => setActiveTab(2)}
                    className={`px-6 py-5 rounded-t-lg cursor-pointer text-[14px] text-[#202224] font-semibold ${activeTab === 2 ? "bg-[#FF6B07] text-white" : "bg-white py-5 border-b-2 border-[#FF6B07]"}`}
                >
                    Previous Poll
                </div>
            </div>
            {renderTabContent()}
        </div>
    );
}
