import React, { useState } from 'react'
import EventsParticipate from '../EventsParticipate'
import ActivityParticipate from '../Activityparticipate'

export default function Eventtab() {
    const [activetab, setActiveTab] = useState(true);
    return (
        <div>
            <div className="flex">
                <div
                    onClick={() => setActiveTab(true)}
                    className={
                        `px-6 py-5 rounded-t-lg cursor-pointer text-[14px] text-[#202224] ${activetab ? "bg-[#FF6B07] text-white" : "bg-white py-5 border-b-2 border-[#FF6B07]"
                        }`
                    }
                >
                    Events Participate
                </div>

                <div
                    onClick={() => setActiveTab(false)}
                    className={
                        `px-6 py-5 rounded-t-lg cursor-pointer text-[14px] text-[#202224] ${!activetab ? "bg-[#FF6B07] text-white" : "bg-white py-5 border-b-2 border-[#FF6B07]"
                        }`
                    }
                >
                    Activity Participate
                </div>
            </div>
            {activetab && <EventsParticipate />}
            {!activetab && <ActivityParticipate />}
        </div>
    )
}
