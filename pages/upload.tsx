import React,{useState,useEffect} from 'react';
import { useRouter } from 'next/router';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { SanityAssetDocument } from '@sanity/client';

import useAuthStore  from '@/store/authStore';
import {client} from '@/utils/utils/client';
import { topics } from '@/utils/utils/constants';
import user from '@/sanity-backend/schemas/user';
import { BASE_URL } from '@/utils/utils';
const Upload = () => {
    const [isLoading,setIsLoading]=useState<Boolean>(false);
    const [Videoasset,setVideoAsset]=useState<SanityAssetDocument | undefined>();
    const [wrongFileType,setWrongFileType]=useState(false);
    const [caption,setCaption]=useState('');
    const [catagory,setCatagory]=useState(topics[0].name);
    const [savingPost,setSavingPost]= useState(false);
    const { userProfile}:{userProfile:any}= useAuthStore();
    const router=useRouter();
    
    useEffect(() => {
        if (!userProfile) router.push('/');
      }, [userProfile, router]);

    const uploadVideo=async(e:any)=>{
        const selectedFile=e.target.files[0];
        const fileTypes=['video/mp4','video/webm','video/ogg']
    
        if(fileTypes.includes(selectedFile.type)){
            setWrongFileType(false);
            setIsLoading(true);
            
            client.assets.upload('file',selectedFile,{
                contentType:selectedFile.type,
                filename:selectedFile.name
            })
            .then((data)=>{
                setVideoAsset(data);
                setIsLoading(false);
            });
        }
        else{
            setIsLoading(false);
            setWrongFileType(true);
        }
    }

    const handlePost=async ()=>{
        if(caption && Videoasset?._id && catagory){
            setSavingPost(true);
            const document ={
                _type:'post',
                caption,
                video:{
                    _type: 'file',
                    asset:{
                        _type:`reference`,
                        _ref: Videoasset?._id
                    }
                },
                userId:userProfile?._id,   
                postedBy:{
                    _type:'postedBy',
                    _ref:userProfile?._id 
                },
                topic:catagory
    
                
            }
            await axios.post(`${BASE_URL}/api/post`,document);
            router.push('/');
        }
       

    }
    const handleDiscard = () => {
        setSavingPost(false);
        setVideoAsset(undefined);
        setCaption('');
        setCatagory('');
        setIsLoading(false);
      };
    



  return (
    <div className='flex w-full h-full absolute md:left-0 left-0 pl-5 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] md:justify-center justify-start '>
      <div className='bg-white rounded-lg xl:h-[80vh] md:w-[60%] w-[95%]  flex gap-6 flex-wrap justify-between items-center p-14 pt-6 '>
        <div>
            <div>
                <p className='text-2xl font-bold'>Upload Video</p>
                <p className='text-md text-gray-400'>Post a video to your account</p>
            </div>
            <div className='border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-green-300 hover:bg-gray-100 '>
                {isLoading?
                    (
                        <div
                            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-success motion-reduce:animate-[spin_1.5s_linear_infinite]"
                            role="status">
                            <span
                                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                > Uploading...</span>
                            
                        </div>
                        
                        
                        
                    ):(
                        <div>
                            {!Videoasset ?(
                                <label className='cursor-pointer'>
                                <div className='flex flex-col items-center justify-center h-full'>
                                    <div className='flex flex-col items-center justify-center'>
                                        <p className='font-bold text-xl'>
                                            <FaCloudUploadAlt color="skyblue" className="text-gray-300 text-6xl"/>
                                        </p>
                                        <p className="text-xl font-semibold">
                                            Upload video
                                        </p>

                                    </div>
                                    <p className='text-gray-400 text-center mt-10 text-sm leading-10'>
                                       Mp4 or WebM or ogg <br/>
                                       720x1280 or higher <br/>
                                       Up to 10 minutes <br/>
                                       Less than 2GB
                                 
                                    </p>
                                    <p className='bg-customPink text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none'>
                                      Select file  
                                    </p>


                                </div>
                                <input 
                                    type='file'
                                    name='upload-video'
                                    onChange={(e)=> uploadVideo(e)}
                                    className='w-0 h-0'
                                />

                            </label>

                                
                            ):(
                                
<div className=' rounded-3xl w-[300px]  p-4 flex flex-col gap-6 justify-center items-center'>
                    <video
                      className='rounded-xl h-[462px] mt-16 bg-black'
                      controls
                      loop
                      src={Videoasset?.url}
                    />
                    <div className=' flex justify-between gap-20'>
                      <p className='text-lg'>{Videoasset.originalFilename}</p>
                      <button
                        type='button'
                        className=' rounded-full bg-gray-200 text-red-400 p-2 text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out'
                        onClick={() => setVideoAsset(undefined)}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
             </div>
                    {wrongFileType && (
                        <p className='text-center text-xl text-red-400 font-semibold mt-4 w-[250px]'>
                         please select a video file (mp4 or webm or ogg)
                        </p>
                    )}
           
                

        </div>
        <div className='flex flex-col gap-3 pb-10'>
                    <label className='text-md font-medium '>Caption</label>
                    <input
                        type='text'
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        className='rounded lg:after:w-650 outline-none text-md border-2 border-gray-200 p-2'
                    />
                    <label className='text-md font-medium'>Choose a catagory</label>
                    <select
                    onChange={ (e) => setCatagory(e.target.value)}
                     className='outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer'
                    >
                        {topics.map((topic)=>(
                            <option
                                key={topic.name}
                                className='outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300'
                                value={topic.name}
                            >
                                {topic.name}
                            </option>
                        ))};
                    </select>
                            <div className='flex gap-6 mt-10'>
                                <button
                                     onClick={handleDiscard}
                                    type='button'
                                    className='border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
                                >
                                    Discard
                                </button>
                                <button
                                    disabled={Videoasset?.url ? false : true}
                                    onClick={handlePost}
                                    type='button'
                                    className='bg-customPink text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
                                >
                                    {savingPost ? 'Posting...' : 'Post'}
                                </button>

                            </div>


                </div>

      </div>
    </div>
  )
};

export default Upload
