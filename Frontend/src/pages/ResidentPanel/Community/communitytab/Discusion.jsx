import React, { useState } from 'react'
import { FiMoreVertical, FiSearch, FiEye } from 'react-icons/fi'
import Avatar from '../../../../assets/images/avatar.png'
import usericon from '../../../../assets/images/usericon.png'
import eyeicon from '../../../../assets/images/eyeicon.svg'

const answers = [
  "Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your dummy content!",
  "Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your dummy content!",
  "Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your dummy content!",
]


export default function Discussion() {
  const [selectedChatId, setSelectedChatId] = useState(3)
  const [isAskingQuestion, setIsAskingQuestion] = useState(false)
  const [isAnswerModal, setIsAnswerModal] = useState(false)
  const [questionTitle, setQuestionTitle] = useState('')
  const [questionList, setQuestionList] = useState(true)
  const [Askquestion, setAskQuestion] = useState(false)
  const [userAnswer, setUserAnswer] = useState('');
  

  const handleInputChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const handlePostAnswer = () => {
    if (userAnswer.trim()) {
      setAnswers([...answers, userAnswer]);
      setUserAnswer(''); // Clear the input after submission
    }
  };

  const chats = [
    {
      id: 1,
      name: 'Michael John',
      message: 'Hi, John! How are you doing?',
      time: '10:27'
    },
    {
      id: 2,
      name: 'Jenny Wilson',
      message: 'Hello, Jenny',
      time: '7:00',
      unreadCount: 7
    },
    { id: 3, name: 'Community', message: 'Typing...', time: '9:20' },
    { id: 4, name: 'Esther Howard', message: 'Hello, Esther', time: '10:27' },
    {
      id: 5,
      name: 'Cody Fisher',
      message: 'Thank you for your order!',
      time: '7:00'
    }
  ]

  const discussions = [
    {
      id: 1,
      sender: 'Community',
      question: 'What is the capital of France?',
      time: '9:20',
      votes: 0,
      answers: [
        "Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your dummy content! Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your."
      ]
    },
    {
      id: 2,
      sender: 'Community',
      question: 'What is the capital of France?',
      time: '9:20',
      votes: 0,
      answers: [
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, beatae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, beatae.'
      ]
    },
    {
      id: 3,
      sender: 'Community',
      question: 'What is the capital of France?',
      time: '9:20',
      votes: 0,
      answers: [
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, beatae.Lorem ipsum dolor sit amet consectetur adipisicing elit.'
      ]
    },
    {
      id: 4,
      sender: 'Community',
      question: 'What is the capital of France?',
      time: '9:20',
      votes: 0,
      answers: [
        'PaLorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, beatae.Lorem ipsum dolor sit amet consectetur adipisicing elit. ris',
      ]
    },
    {
      id: 5,
      sender: 'Community',
      question: 'What is the capital of France?',
      time: '9:20',
      votes: 0,
      answers: [
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, beatae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, beatae.'
      ]
    },
    {
      id: 6,
      sender: 'Community',
      question: 'What is the capital of France?',
      time: '9:20',
      votes: 0,
      answers: [
        'PaLorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, beatae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, beatae.ris'
      ]
    }
  ]

  const handleChatClick = chatId => {
    setSelectedChatId(chatId)
  }

  const handleAskQuestionClick = () => {
    setIsAskingQuestion(true)
    setQuestionList(false)
    setIsAnswerModal(false)
  }



  const handleAnswerModal = () => {
    setIsAnswerModal(true)
    setQuestionList(false)

  }

  const handleFormSubmit = e => {
    e.preventDefault()
    alert('Question Submitted: ' + questionTitle)
    setIsAskingQuestion(false)
    setQuestionList(true) // Hide form after submission
  }

  return (
    <div className='flex h-screen bg-gray-100'>
      {/* Sidebar (Chats List) */}
      <div className='w-1/4 bg-white shadow-lg rounded-tl-lg overflow-hidden max-sm:hidden max-md:hidden flex flex-col p-6 max-md:w-full max-xl:w-1/2 max-2xl:w-1/2 max-sm:w-full'>
        <div>
          <h1 className='text-xl font-semibold text-gray-800'>Chat</h1>
          <div className='relative mt-4'>
            <input
              type='text'
              placeholder='Search Here'
              className='w-full py-2 pl-10 pr-4 bg-gray-100 rounded-lg'
            />
            <FiSearch className='absolute left-3 top-3 text-gray-400 text-lg' />
          </div>
        </div>
        <div className='flex-1 overflow-y-auto'>
          {chats.map(chat => (
            <div
              key={chat.id}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 ${selectedChatId === chat.id ? 'bg-gray-200' : 'hover:bg-gray-100'
                }`}
              onClick={() => handleChatClick(chat.id)}
            >
              <div className='flex items-center'>
                <img
                  src={Avatar}
                  alt='Avatar'
                  className='w-12 h-12 rounded-full object-cover mr-4'
                />
                <div>
                  <h4 className='font-semibold text-gray-800'>{chat.name}</h4>
                  <p className='text-sm text-gray-500'>{chat.message}</p>
                </div>
              </div>
              <div className='flex flex-col items-center space-y-1'>
                <span className='text-xs text-gray-400'>{chat.time}</span>
                {chat.unreadCount && (
                  <span className='bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full'>
                    {chat.unreadCount}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className='flex-1 flex flex-col'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 bg-white shadow question-class'>
          <div className='flex items-center max-sm:mb-[15px] max-sm:items-center'>
            <img
              src={usericon}
              alt='Avatar'
              className='w-10 h-10 rounded-full object-cover mr-4'
            />
            <div>
              <h4 className='font-semibold text-gray-800'>Community</h4>
              <span className='text-sm text-gray-400'>9:00 pm</span>
            </div>
          </div>
          <div className='flex gap-5'>
            {!isAskingQuestion && (
              <button
                className='px-4 py-2 bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-all duration-200 max-sm:text-sm rounded-[10px] h-[51px]'
                onClick={handleAskQuestionClick}
              >
                Ask Question
              </button>
            )}
            <FiMoreVertical
              size={40}
              className='text-gray-600 rounded-full  p-2  bg-gray-100 cursor-pointer'
            />
          </div>
        </div>

        {

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`p-4 ${
                m.senderId == _id ? "bg-gray-200" : "bg-white"
              } rounded-lg shadow`}
          isAskingQuestion &&
          <div className='flex-1 p-6 bg-[#F4F4F4] space-y-4'>
            <div className='bg-indigo-50 rounded-xl border border-blue-500 p-4'>
              <h2 className='text-xl font-normal text-gray-800 mb-4'>
                Writing a good question
              </h2>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Necessitatibus laudantium
                <br /> omnis ullam illo dolorem in! Facere libero fugiat quo
                nisi?
              </p>
              <div className='mt-6'>
                <p className='font-semibold'>Steps</p>
                <p className="font-sans ml-2 relative pl-6 before:absolute before:left-0 before:top-0 before:text-xl before:text-black before:content-['•']">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga,
                  beatae.
                </p>
                <p className="font-sans ml-2 relative pl-6 before:absolute before:left-0 before:top-0 before:text-xl before:text-black before:content-['•']">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga,
                  beatae.
                </p>
                <p className="font-sans ml-2 relative pl-6 before:absolute before:left-0 before:top-0 before:text-xl before:text-black before:content-['•']">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga,
                  beatae.
                </p>
                <p className="font-sans  ml-2 relative pl-6 before:absolute before:left-0 before:top-0 before:text-xl before:text-black before:content-['•']">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga,
                  beatae.
                </p>
                <p className="font-sans  ml-2 relative pl-6 before:absolute before:left-0 before:top-0 before:text-xl before:text-black before:content-['•']">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga,
                  beatae.
                </p>
              </div>
            </div>
            <form
              onSubmit={handleFormSubmit}
              className='bg-gray-100 p-6 rounded-xl shadow-lg space-y-4'
            >
              <div>
                <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                  Title
                </h3>
                <p>
                  Be specific and imagine you're asking a question to another
                  person.
                </p>
              </div>
              <div>
                <input
                  type='text'
                  className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 hover:border-blue-300 transition-all duration-200'
                  placeholder='e.g Is there an R function for finding the index of an element in a Vector ?'
                />
              </div>
              <button
                type='submit'
                className='px-4 py-2 bg-custom-gradient text-white font-medium rounded-md'
              >
                Next
              </button>
            </form>
          </div>

        }

        {questionList &&
          <div className=' overflow-x-auto p-[20px] custom-scrollbar h-[73vh] bg-[#F4F4F4] space-y-3 '>
            {selectedChatId === 3 &&
              discussions.map(discussion => (
                <div
                  key={discussion.id}
                  className='p-4 bg-[rgb(234_236_245)]  rounded-lg shadow-sm flex justify-between'
                >
                  <div className='flex flex-col items-center justify-start text-gray-400 mr-4 space-y-2 max-sm:hidden mt-[10px]'>
                    <div className='flex items-center space-x-1'>
                      <span
                        className={`text-sm font-normal ${discussion.votes === 0
                          ? 'text-[#A7A7A7]'
                          : 'text-[#39973D]'
                          }`}
                      >
                        {discussion.votes}
                      </span>
                      <span
                        className={`text-sm font-normal ${discussion.votes === 0
                          ? 'text-[#A7A7A7]'
                          : 'text-[#39973D]'
                          }`}
                      >
                        Votes
                      </span>
                    </div>
                    <div className='flex items-center space-x-1'>
                      <span
                        className={`text-sm font-normal ${discussion.answers.length === 0
                          ? 'text-gray-400'
                          : 'text-[#5678E9]'
                          }`}
                      >
                        {discussion.answers.length}
                      </span>
                      <span
                        className={`text-sm font-normal ${discussion.answers.length === 0
                          ? 'text-gray-400'
                          : 'text-[#5678E9]'
                          }`}
                      >
                        Answers
                      </span>
                    </div>
                  </div>

                  <div className='flex-1'
                    onClick={handleAnswerModal}>

                    <div className='flex justify-between items-end'>
                      <h5 className='text-[#4F4F4F] font-semibold mb-2 max-sm:text-[14px]'>
                        {discussion.question}
                      </h5>
                      <div className='flex bg-white rounded-[30px] p-2 items-center space-x-1 w-[61px] max-sm:w-[70px]'>
                        <img
                          src={eyeicon}
                          className='text-gray-800 text-xl cursor-pointer hover:text-gray-600 transition'
                        />
                        <span className='text-gray-600 font-normal'>20</span>
                      </div>
                    </div>
                    <ul className='text-sm text-gray-600'>
                      {discussion.answers.map((answer, index) => (
                        <li
                          key={index}
                          className='mb-1 text-wrap max-sm:text-[14px] text-[#A7A7A7] max-w-[900px] font-light leading-[24px]'
                        >
                          {index + 1}. {answer}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
          </div>

        }
  
        {isAnswerModal &&
          <div className="flex flex-col items-center gap-5 bg-gray-100 h-[70vh] p-6  custom-scrollbar overflow-y-auto">
            


            {/* Question Section */}
            <div className="space-y-4 bg-gray-50 w-full h-36 p-4 rounded-lg relative"> {/* Added relative positioning to container */}
              <h1 className="text-lg font-semibold text-gray-800">What is the capital of France?</h1>
              <p className="text-gray-600">
                Feel free to let me know if you need more examples or if there's anything specific you'd like to include in
                your dummy content!
              </p>
              {/* Eye icon and count positioned at the top right */}
              <div className='absolute top-4 right-8 flex items-center space-x-1'>
                <img
                  src={eyeicon}
                  className='text-gray-800 text-xl cursor-pointer hover:text-gray-600 transition'
                />
                <span className='text-gray-600 font-normal'>20</span>
              </div>
            </div>


            {/* Answers Section */}
            <div className="space-y-4 bg-gray-50 w-full h-[24vh] p-4 rounded-lg"> {/* Added gap between answers and input section */}
              <h2 className="font-semibold text-blue-500 mb-2">Answers</h2>
              <ul className="space-y-4">
                {answers.map((answer, index) => (
                  <li
                    key={index}
                    className="p-1 rounded-lg  text-gray-700"
                  >
                    {index + 1}. {answer}
                  </li>
                ))}
              </ul>
            </div>


            {/* Input Section */}
            <div className="space-y-4  w-full h-[26vh] mt- p-4 rounded-lg">
              <h2 className='text-semibold'>Your Answers</h2> {/* Added gap between input section and next section */}
              <textarea
                value={userAnswer}
                onChange={handleInputChange}
                placeholder="Type here"
                className="w-full p-3  rounded-lg "
                rows="6"
              />
              <button
                onClick={handlePostAnswer}
                className=" bg-custom-gradient w-[238px] h-[51px] ml-[900px] text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition"
              >
                Post Your Answer
              </button>
            </div>

          </div>

        }

      </div>
    </div>
  )
}
