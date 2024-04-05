"use client"

import { useRouter } from 'next/navigation';
import React from 'react'
import { twMerge } from 'tailwind-merge';
import {RxCaretLeft} from 'react-icons/rx'
import {RxCaretRight} from 'react-icons/rx'
import {HiHome} from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi';
import { Button } from './Button';
import useAuthModal from '@/hooks/useAuthModal';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useUser } from '@/hooks/useUser';
import { FaUserAlt } from 'react-icons/fa';
import { toast } from 'react-hot-toast';



interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

export const Header:React.FC<HeaderProps> = (
    {
        children,
        className,
    }
) => {
    const authModal = useAuthModal();
    const router = useRouter();

    const supabaseClient = useSupabaseClient();
    const { user, subscription } = useUser();

    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();
        // Reset any playing songs
        router.refresh();

        if (error) {
            toast.error(error.message);
        } else {
            toast.success('Logged out !')
        }
    }
  return (
    <div className={twMerge(`
        h-fit
        bg-gradient-to-b
        from-purple-900
        p-6
    `,
        className
    )}
    >
    <div className='
        w-full
        mb-4
        flex
        items-center
        justify-between
    '>
        <div className='
            
            flex
            gap-x-2
            items-center
        '>
            <button onClick={() => router.back()} className='
                rounded-full
                bg-black
                flex
                items-center
                justify-center
                hover:opacity-75
                transition
            '>
                <RxCaretLeft size={35} className="text-white" />
            </button>
            <button onClick={() => router.forward()} className='
                  rounded-full
                  bg-black
                  flex
                  items-center
                  justify-center
                  hover:opacity-75
                  transition          
            '>
                <RxCaretRight size={35} className="text-white" />
            </button>
        </div>
        <div className='flex md:hidden gap-x-2 items-center'>
            <button className='
                rounded-full
                p-2
                bg-white
                flex
                items-center
                justify-center
                hover:opacity-75
                transition
            '>
                <HiHome className ="text-black" size={20}></HiHome>
            </button>
            <button className='
                rounded-full
                p-2
                bg-white
                flex
                items-center
                justify-center
                hover:opacity-75
                transition
            '>
                <BiSearch className ="text-black" size={20}></BiSearch>
            </button>
        </div>
        <div className='
            flex
            justify-between
            items-center
            gap-x-4
        '>
            {user ? (
                <div className='
                    flex gap-x-4 items-center
                '>
                    <Button
                        className='bg-white px-6 py-2'
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                    <Button 
                        onClick={() => router.push('/account')}
                        className='bg-white'
                    >
                        <FaUserAlt />
                    </Button>
                </div>
            ) : (
            <>
                <div className='flex items-center'>
                    <Button onClick={authModal.onOpen} className='
                        bg-transparent
                        text-neutral-300
                        font-medium
                        max-h-12
                        w-32
                    '>
                        Sign Up
                    </Button>
                    <Button onClick={authModal.onOpen} className='
                        bg-white
                        px-6
                        py-2
                        max-h-12
                        w-32
                        '>
                            Log In
                    </Button>
                </div>
            </>
            )}
        </div>
        </div> 
        {children}  
    </div>
  )
}
