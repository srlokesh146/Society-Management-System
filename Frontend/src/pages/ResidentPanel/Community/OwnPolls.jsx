import React, { useEffect, useState } from 'react'
import avatar from '../../../assets/images/avatar.png'
import eyeicon from '../../../assets/images/eyeicon.png'
import circleimg from '../../../assets/images/circleimg.svg'
import CreatePollModal from '../../../components/modal/CreatePollModal'

const Polls = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [defaultSelected, setDefaultSelected] = useState(() => {
    return JSON.parse(localStorage.getItem('pollDefaultSelected')) || {}
  })

  const pollData = [
    {
      pollType: 'Multichoice polls',
      name: 'Arlene McCoy',
      number: 20,
      question: 'Sales Deal with Toyota - Azure HF - AMS Amplify?',
      title: 'Sales Deal with Toyota - Azure HF - AMS Amplify?',
      date: '01/07/2024, 10:00 AM',
      options: [
        { option: 'Yes', votes: 75 },
        { option: 'No', votes: 40 }
      ]
    },
    {
      pollType: 'Multichoice polls',
      name: 'Arlene McCoy',
      number: 20,
      question: 'Sales Deal with Toyota - Azure HF - AMS Amplify?',
      title: 'Sales Deal with Toyota - Azure HF - AMS Amplify?',
      date: '01/07/2024, 10:00 AM',
      options: [
        { option: 'Yes', votes: 65 },
        { option: 'No', votes: 35 }
      ]
    },
    {
      name: 'Arlene McCoy',
      number: 20,
      pollType: 'Multichoice polls',
      question: 'Sales Deal with Toyota - Azure HF - AMS Amplify?',
      title: 'Sales Deal with Toyota - Azure HF - AMS Amplify?',
      date: '01/07/2024, 10:00 AM',
      options: [
        { option: 'Yes', votes: 50 },
        { option: 'No', votes: 50 }
      ]
    },
    {
      name: 'Arlene McCoy',
      number: 20,
      pollType: 'Multichoice polls',
      question: 'Sales Deal with Toyota - Azure HF - AMS Amplify?',
      title: 'Sales Deal with Toyota - Azure HF - AMS Amplify?',
      date: '01/07/2024, 10:00 AM',
      options: [
        { option: 'Yes', votes: 80 },
        { option: 'No', votes: 20 }
      ]
    }
  ]

  useEffect(() => {
    localStorage.setItem('pollDefaultSelected', JSON.stringify(defaultSelected))
  }, [defaultSelected])

  const handleCheckboxChange = index => {
    setDefaultSelected(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className='bg-white pt-[30px] px-[20px] pb-[20px]'>
      <div className='flex justify-between items-center pb-[30px] max-sm:pb-[10px]'>
        <div>
          <h2 className='text-[20px] leading-[30px] font-semibold text-[#202224] max-sm:text-[16px]'>
            Polls
          </h2>
        </div>
        <div>
          <button
            onClick={handleOpenModal}
            className='bg-custom-gradient py-[12px] px-[14px] w-[138px] rounded-[10px] text-white text-[18px] font-semibold max-sm:w-[117px] max-sm:text-[16px] max-sm:px-2'
          >
            Create Polls
          </button>
        </div>
      </div>
      <div className='grid grid-cols-4 max-xl:grid-cols-2 max-md:grid-cols-2 max-sm:grid-cols-1 gap-6 max-3xl:grid-cols-2'>
        {pollData.map((poll, index) => {
          const totalVotes = poll.options.reduce(
            (sum, option) => sum + option.votes,
            0
          )

          return (
            <div
              key={index}
              className='bg-white shadow-lg rounded-lg p-6 border-gray-200 hover:shadow-xl transition-shadow duration-300 max-sm:p-[10px]'
            >
              <div className='flex justify-between'>
                <div className='flex'>
                  <div className='mr-[15px]'>
                    <img src={avatar} alt='' className='w-[48px]' />
                  </div>
                  <div>
                    <p className='text-[18px] text-[#5678E9] font-semibold mb-[2px] max-sm:text-[16px] max-sm:leading-[19.5px]'>
                      {poll.name}
                    </p>
                    <p className='text-[14px] text-[#202224] leading-[27px] max-sm:text-[13px]'>
                      {poll.pollType}
                    </p>
                  </div>
                </div>
                <div>
                  <p className='text-[14px] bg-[#6E8EF9] w-[61px] h-[31px] flex justify-center items-center p-4 text-white rounded-full py-[5px] px-[10px]'>
                    <img src={eyeicon} alt='' className='mr-1' />
                    {poll.number}
                  </p>
                </div>
              </div>
              <div className='border border-b-[#F4F4F4] mt-[15px] mb-[15px]'></div>
              <div className='mb-4'>
                <h2 className='text-[16px] font-medium text-[#202224] mb-2 leading-[24px]'>
                  {poll.title}
                </h2>
              </div>
              <div className='mb-[20px] text-[#202224] text-[14px] leading-[21px]'>
                <div className='flex items-center'>
                  <label className='radio'>
                    <img src={circleimg} alt='' className='mr-[8px]' />
                    <span className='ml-0 text-[14px] leading-[21px] text-[#4F4F4F]'>
                      Select one or more
                    </span>
                  </label>
                </div>
              </div>

              <div className='mb-4'>
                <div className='mb-4'>
                  <div className='flex justify-between items-center'>
                    <div className='flex items-center'>
                      <label className='radio'>
                        <input
                          type='radio'
                          name={`poll-${index}`}
                          className='w-4 h-4 rounded-full bg-gray-200'
                        />
                        <span className='ml-0 text-[14px] leading-[21px] text-[#4F4F4F]'>
                          Yes
                        </span>
                      </label>
                    </div>
                    <span className='flex items-center text-sm font-normal text-[#4F4F4F]'>
                      <div>
                        <img src={avatar} alt='' className='mr-[5px]'pconstant/>
                      </div>
                      {poll.options[0].votes}
                    </span>
                  </div>

                  <div
                    className='mt-[5px] h-[5px] rounded-lg overflow-hidden bg-gray-200'
                    style={{ width: '94%', marginLeft: '20px' }}
                  >
                    <div
                      className='bg-green-500 h-2'
                      style={{
                        width: `${(poll.options[0].votes / totalVotes) * 100}%`
                      }}
                    />
                  </div>
                </div>

                <div className='mb-[10px]'>
                  <div className='flex justify-between items-center'>
                    <div className='flex items-center'>
                      <label className='radio'>
                        <input
                          type='radio'
                          name={`poll-${index}`}
                          className='w-4 h-4 rounded-full bg-gray-200'
                        />
                        <span className='ml-0 text-[14px] leading-[21px] text-[#4F4F4F]'>
                          No
                        </span>
                      </label>
                    </div>
                    <span className='flex items-center text-sm font-normal text-[#4F4F4F]'>
                      <div>
                        <img src={avatar} alt='' className='mr-[5px]'/>
                      </div>
                      {poll.options[1].votes}
                    </span>
                  </div>
                  <div
                    className='mt-[5px] h-[5px] rounded-lg overflow-hidden bg-gray-200'
                    style={{ width: '94%', marginLeft: '20px' }}
                  >
                    <div
                      className='bg-red-500 h-2'
                      style={{
                        width: `${(poll.options[1].votes / totalVotes) * 100}%`
                      }}
                    />
                  </div>
                </div>

                <p className='text-xs text-gray-400 text-end'>{poll.date}</p>
              </div>
            </div>
          )
        })}
      </div>
      {isModalOpen && <CreatePollModal closeModal={handleCloseModal} />}
    </div>
  )
}

export default Polls
