'use client'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { motion } from 'framer-motion'
import { SignInButton, SignUpButton, useUser } from '@clerk/nextjs'
const ModalAuthentication = () => {


    const [isBrowser, setIsBrowser] = useState(false)
    const { isSignedIn } = useUser()
    useEffect(() => {
        setIsBrowser(true)
    }, [])

    if (isSignedIn) return null

    const modalContent = (
        <div className='fixed inset-0 z-50 flex h-full w-full justify-center items-center overflow-y-auto dark:bg-[rgba(0,0,0,0.7)] bg-[rgba(255,255,255,0.7)] py-4'>
            <motion.div
                initial={{ opacity: 0, y: 0, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className='w-fit max-w-[90vw] md:max-w-xl rounded-3xl bg-[#343232] shadow-lg dark:bg-dark-secondary'
            >
                <div className='w-full dark:text-black rounded-3xl py-6 px-8 md:px-14 items-center text-white dark:bg-white bg-black flex flex-col'>
                    <strong className='text-xl mb-2'>Welcome Back</strong>
                    <div>Log in or sign up to get smarter  </div>
                    <div>responses, upload files and images,</div>
                    <div> and more.</div>
                    <SignInButton>
                        <button className='dark:bg-black cursor-pointer mt-5 dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white  dark:text-white text-black bg-white border border-gray-400 w-full flex items-center justify-center py-2 rounded-full'>
                            Log in
                        </button>
                    </SignInButton>
                    <SignUpButton>
                        <button className='dark:bg-black cursor-pointer mt-2 dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white  dark:text-white text-black bg-white border border-gray-400 w-full flex items-center justify-center py-2 rounded-full'>
                            Create new account
                        </button>
                    </SignUpButton>
                </div>
            </motion.div>
        </div>
    )

    if (isBrowser) {
        return ReactDOM.createPortal(modalContent, document.body)
    } else {
        return null
    }
}

export default ModalAuthentication