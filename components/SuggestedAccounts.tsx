import React , {useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import useAuthStore from '@/store/authStore';

import { IUser } from '@/types';

const SuggestedAccounts = () => {
  const {fetchAllUsers , allUsers}= useAuthStore();

  useEffect(()=>{
    fetchAllUsers();
  },[fetchAllUsers]);
  return (
    <div className='xl:border-b-2 border-gray-200 pb-4'>
      <p className='text-gray-500 font-semibold m-3 mt-8 hidden xl:block'>Suggested Accounts</p>
    
      <div>
        {allUsers.slice(0,6).map((user: IUser)=>(
          <Link href={`/Profile/${user._id}`} key={user._id}>
              <div className='flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded'>
                  <div className='w-9 h-9'>
                      <Image
                       src={user.image}
                       width={40}
                       height={40}
                       className='rounded-full'
                       alt='user Profile'
                       layout='responsive'
                      
                      />
                  </div>
                  <div className='hidden xl:block'>
                    <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>
                       {user.userName.replaceAll(' ','')}
                       <GoVerified className="fill-blue-500 "/>
                    </p>
                    <p className='capitalize text-gray-400 text-xs'>
                      {user.userName}
                    </p>

                  </div>
              </div>
          </Link>
        ))}
      </div>
    
    
    
    </div>
  )
}

export default SuggestedAccounts
