"use client"

import AuthModal from "@/components/AuthModal";
import Modal from "@/components/Modal";
import UploadModal from "@/components/UploadModal";

import { useEffect, useState } from "react"

export const ModalProvider = () => {

const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
    setIsMounted(true);
},[])

if(!isMounted) {
    return null;
}
    return (
        <>
            <AuthModal/>
            <UploadModal/>
        </>
    )
}