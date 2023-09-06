import { Video } from "../types";
import React,{useState,useEffect,useRef} from 'react'
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {HiVolumeUp,HiVolumeOff} from 'react-icons/hi';
import { BsPlay,BsFillPlayFill,BsFillPauseFill } from 'react-icons/bs';
import {GoVerified} from 'react-icons/go';

interface IProps{
    post:Video;
}


const VideoCard:NextPage<IProps> = ({post}) => {
    
   const  [ isHover, setIsHover]=useState(false);

   const  [ playing, setPlaying]=useState(false);

   const  [ isVideoMuted, setIsVideoMuted]=useState(false);
   
    const videoRef =useRef<HTMLVideoElement>(null);

    const onVideoPress = () => {
      if (playing) {
        videoRef?.current?.pause();
        setPlaying(false);
      } else {
        videoRef?.current?.play();
        setPlaying(true);
      }
    };
  useEffect(()=>{
    if(videoRef?.current){
      videoRef.current.muted=isVideoMuted;
    }
  },[isVideoMuted])

  const handleMouseEnter = () => {
    setIsHover(true);
    if (videoRef.current) {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHover(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setPlaying(false);
    }
  };

      
  return (
    <div className='flex flex-col border-b-2 border-gray-400 pb-6'>
      <div>
        <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
            <div className='md:w-16 md:h-16 w-10 h-10'>
                <Link href={`/Profile/${post.postedBy._id}`}>
                    <>
                        <Image
                            width={62}
                            height={62}
                            className='rounded-full'
                            src={post.postedBy.image}
                            alt='Profile Photo'
                            layout="responsive"
                        
                        />
                    </>
                    </Link>
            </div>
            <div>
                <Link href={`/Profile/${post.postedBy._id}`}>
                   <div className="flex items-center gap-2">
                        <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                            {post.postedBy.userName}{''}
                            <GoVerified className="text-blue-500 text-md"/>
                        </p>
                        <br/>
                        <p className="capitalize font-medium text-xs text-grey-500 hidden md:block">
                            {post.postedBy.userName}{'       '}
                            
                            
                             </p>
                            {post.caption &&(
                                <div className="rounded bg-customPink text-white text-center w-15 p-1 pb-1 flex flex-wrap hidden md:block  gap-x-4">
                                <p className=" mt-1 capitalize font-large text-xs text-grey-500  ">
                                   <span className="text-white font-bold m-1">#</span>{post.caption}{''} 
                                    
                                    
                                </p>
                              
                                </div>
                            )}
                             
                             
                        
                        
                       
                   </div>
                </Link>

            </div>

        </div>
      </div>

    <div className="lg:ml-20 flex gap-4 relative">
        <div 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="rounded-3xl">
          
            <Link href={`/detail/${post._id}`}>
            
                <video loop ref={videoRef} autoPlay={false} className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-530px w-200px rounded-2xl cursor-pointer bg-gray-100" src={post.video.asset.url}
                
                
                
                >

                </video>
              
            </Link>
            {isHover && (
                <div 
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                
                className="absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] p-3">
                    
                    {isVideoMuted ? (
                        <button onClick={()=> setIsVideoMuted(false)}>
                            <HiVolumeOff className="text-black text-1xl lg:text-3xl mb-1"/>
                        </button>
                    ):(
                        <button onClick={()=> setIsVideoMuted(true)}>
                            <HiVolumeUp className="text-black text-1xl lg:text-3xl mb-1"/>
                        </button>
                    )}
                </div>
            )}

        </div>
        

    </div>

    </div>
  )
}

export default VideoCard
