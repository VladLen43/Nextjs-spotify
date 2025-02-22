"use client"

import React from 'react'
import {TbPlaylist} from 'react-icons/tb'
import {AiOutlinePlus} from 'react-icons/ai'
import useAuthModal from '@/hooks/useAuthModal'
import { useUser } from '@/hooks/useUser'
import useUploadModal from '@/hooks/useUploadModal'
import { Song } from '@/types'
import MediaItem from './MediaItem'
import useOnPlay from '@/hooks/useOnPlay'

interface libraryProps {
    songs: Song[];
}

export const Library:React.FC<libraryProps> = ({songs}) => {
    const authModal = useAuthModal();
    const { user} = useUser();
    const uploadModal = useUploadModal();
    const onPlay = useOnPlay(songs);

    const onClick = () => {
        if(!user) {
            return authModal.onOpen();
        }
        // check for subscription
        return uploadModal.onOpen();
    }
  return (
    <div className='flex flex-col'>
        <div
            className='
                flex
                items-center
                justify-between
                px-5
                pt-4
            '
        >
            <div 
            className='
                inline-flex
                items-center
                gap-x-2
            '>
                <TbPlaylist className="text-neutral-400" size={26} />
                <p className='
                    text-neutral-400
                    font-medium
                    text-md
                '>
                    Your library
                </p>
            </div>
            <AiOutlinePlus className="
                text-neutral-400
                cursor-pointer
                hover:text-white
                transition
            " 
            size={20} 
            onClick={onClick} />
        </div>
        <div className='
            flex
            flex-col
            gap-y-2
            mt-4
            px-3
        '>
            {songs.map((item) => (
                <MediaItem
                onClick={(id: string) => onPlay(id)}
                    key = {item.id}
                    data={item}
                />
            ))}
        </div>
    </div>
  )
}
