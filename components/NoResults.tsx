
import React from 'react';
import { MdOutlineVideocamOff } from 'react-icons/md';
import { BiCommentX } from 'react-icons/bi';


interface IProps{
  text: String;
}

const NoResults= ({text}: IProps) => {
  return (
    <div className='flex flex-col justify-center items-center h-full w-full'>
      <p className='text-8xl'>
        {text === "No comments yet! be the first to comment by logging in ^_^ "?
        <BiCommentX /> :<MdOutlineVideocamOff />

        }

       

      </p>
      <p className="text-1xl text-center">{text}</p>
    </div>
  )
}

export default NoResults
