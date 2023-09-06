import React,{useState} from 'react';
import Image from 'next/legacy/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';
import useAuthStore from '@/store/authStore';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { IUser, Video } from '@/types';
import { BASE_URL } from '@/utils/utils';
import VideoCard from '@/components/VideoCard';
import NoResults from '@/components/NoResults';
import { text } from 'stream/consumers';
import user from '@/sanity-backend/schemas/user';



const Search = ({videos}:{videos:Video[]}) => {
    const [isAccounts,setIsAccounts]=useState(true);
    const Accounts=isAccounts ? 'border-b-2 border-black' : 'text-gray-400'; 
    const Videos=!isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
    const {allUsers}=useAuthStore();
  
    const router= useRouter();
   const {searchTerm}:any = router.query;
   const searchedAccounts = allUsers?.filter((user:IUser)=> user.userName.toLowerCase().includes(searchTerm));
 
  
  
    return (
    <div className='w-full'>
   
      <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full'>
              <p className={`text-xl font-semibold cursor-pointer mt-2 ${Accounts}`} onClick={()=>setIsAccounts(true)}>Accounts</p>
              <p className={`text-xl font-semibold cursor-pointer mt-2 ${Videos}`} onClick={()=>setIsAccounts(false)}> Videos</p>
      </div>
      {isAccounts ?(
            <div className='md:mt-16'>
                {searchedAccounts.length >0 ? (
                    searchedAccounts.map((user:IUser,idx:number)=>(
                        <Link key={idx}  href={`/Profile/${user._id}`}>
                        <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200'>
                          <div className='w-12 h-12'>
                            <Image
                              width={60}
                              height={60}
                              className='rounded-full cursor-pointer'
                              src={user.image}
                              alt='user-Profile'
                              layout='responsive'
                            />
                          </div>

                          <p className='flex cursor-pointer gap-1 items-center text-[18px] font-bold leading-6 text-primary'>
                            {user.userName} <GoVerified className='text-blue-400' />
                          </p>
                        </div>
                      </Link>
                    ))
                ): <NoResults text={`No Accounts Matching ${searchTerm}`}/>}
            </div>

      ):(
        <div className='md:mt-16 flex flex-wrap gap-6 md:justify-start'>
          {videos.length ? (
                videos.map((video:Video, idx:number)=>(
                    <VideoCard post={video} key={idx}/>

                ))
          ): <NoResults text={`No video results for ${searchTerm}`} />}

        </div>

  )}
  
    </div>
  )
}
export const getServerSideProps=async({params:{searchTerm}}: {params:{searchTerm :string}})=>{
    const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);
    return{
      props:{ videos:res.data}
    }
  }
  
export default Search
