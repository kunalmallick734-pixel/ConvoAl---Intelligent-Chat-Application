import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ChevronDown, CircleDotDashedIcon, Rocket, Share, Trash, } from "lucide-react";
import SidebarIcon from "@/components/Icons/Sidebar/Index";
import NewChatIcon from "@/components/Icons/newChat";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";
import CustomSwitch from "../CostomSwitch";
import Button from "@/components/Multipurpose/Button/Index";
import ModalShareChat from "../ShareChat";
import ModalDeleteChat from "../DeleteChat";
import { SignedIn, UserButton } from "@clerk/nextjs";

const AIHeader = ({ setIsOpen, id }: {
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    id: string
}) => {
    const { toggleSidebar, open } = useSidebar();
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
    const [isOpenShareChat, setIsOpenShareChat] = useState<boolean>(false)
    const [openDeleteChat, setOpenDeleteChat] = useState<boolean>(false)

    // set dark mode 
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark') {
            setIsDarkMode(true);
        }
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    return (
        <div className="flex h-16 dark:bg-neutral-900 border-b dark:border-gray-700 bg-white border-gray-200 p-2 sticky top-0 z-20 items-center justify-between">
            {/* Modaling Share Chat */}
            <ModalShareChat id={id} isOpen={isOpenShareChat} onClose={() => setIsOpenShareChat(false)} />
            {/* Modaling Delete Chat */}
            <ModalDeleteChat isOpen={openDeleteChat} onClose={() => { setOpenDeleteChat(false) }} id={id} ></ModalDeleteChat>
            
            {/* icons left */}
            <div className="z-[2] flex items-center gap-1">
                {/* sidebar and create new chat icons (only shown when sidebar is closed) */}
                {!open && (
                    <div className="flex items-center gap-0.5">
                        <Button onClick={toggleSidebar} role="Open Sidebar" align="right">
                            <div className="cursor-pointer p-1 md:p-2 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-800">
                                <SidebarIcon />
                            </div>
                        </Button>
                        <Button role="Create New chat" align="right">
                            <NewChatIcon func={() => setIsOpen(true)} className="rounded-2xl hidden md:flex cursor-pointer p-1 md:p-2 hover:bg-gray-200 dark:hover:bg-gray-800" />
                        </Button>
                    </div>
                )}


                {/* options for small devices */}

                <div className=" flex md:hidden">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="outline-0 mr-2 text-sm rounded-md">
                            <CircleDotDashedIcon />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="p-1 mt-3 mr-3 flex items-center border rounded-2xl border-gray-400 bg-white dark:bg-black shadow-md z-50">
                            <DropdownMenuGroup className="flex flex-col items-center">
                                <DropdownMenuItem asChild>
                                    <div className="flex outline-0 p-2 rounded-lg items-center justify-center gap-1">
                                        <Button icon={Rocket} text="Upgrade" role="Upgrade To Advance" />
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <div className="flex items-center w-fit gap-2 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800">
                                        <CustomSwitch checked={isDarkMode} onChange={setIsDarkMode} />
                                        <label htmlFor="dark-mode-toggle" className="text-sm font-medium">
                                            Dark
                                        </label>
                                    </div>

                                </DropdownMenuItem>
                                {

                                    // share and delete chat

                                    id && (
                                        <>
                                            <DropdownMenuItem asChild>
                                                <div className="w-full flex items-center justify-center outline-0">
                                                    <button onClick={() => setIsOpenShareChat(true)}
                                                        className="flex outline-0 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 items-center justify-center gap-1">
                                                        <Share className="size-4" />
                                                        <span className="text-sm">Share</span>
                                                    </button>
                                                </div>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <div className="w-full flex items-center justify-center outline-0">
                                                    <button onClick={() => setOpenDeleteChat(true)} className="flex outline-0 p-2 text-red-400 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg items-center justify-center gap-1">
                                                        <Trash className="size-4" />
                                                        <span className="text-sm">Delete</span>
                                                    </button>
                                                </div>
                                            </DropdownMenuItem>
                                        </>
                                    )
                                }
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>


                {/* show options for large devices */}

                <div className="hidden md:flex">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className=" flex items-center  justify-center outline-0">
                                <button className="flex items-center px-2 py-1.5 outline-0 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md w-full text-left">
                                    <span className="">Options</span>
                                    <ChevronDown className="mt-1" />
                                </button>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuGroup className="p-1 mt-2 mr-3 flex flex-col items-center border rounded-2xl border-gray-400 bg-white dark:bg-black shadow-md z-50">
                                <DropdownMenuItem asChild>
                                    <div className="flex outline-0 p-2 rounded-lg items-center justify-center gap-1">
                                        <Button icon={Rocket} text="Upgrade" />
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <div className="flex items-center w-fit gap-2 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                                        <CustomSwitch checked={isDarkMode} onChange={setIsDarkMode} />
                                        <label htmlFor="dark-mode-toggle" className="text-sm font-medium">
                                            Dark
                                        </label>
                                    </div>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>


            {/* Header Name */}

            <div className=" w-[100%] h-[100%] absolute top-0 left-0 flex items-center justify-center text-center text-3xl md:text-4xl lg:text-5xl font-semibold pointer-events-none">
                <div className="bg-gradient-to-r via-[#ed0f82] from-[#d54cff] to-[#ff118c] bg-clip-text text-transparent">
                    Convo AI
                </div>
            </div>


           {/* Share and delete options for large devices */}

            <div className="w-full z-[2] flex justify-end items-center">
                <div className="">
                    {
                        // share and delete chat
                        id && (
                            <div className="hidden md:flex items-center justify-center gap-2">
                                <Button onClick={() => {
                                    if (id) {
                                        setIsOpenShareChat(true)
                                    }
                                }} text="Share" icon={Share} />
                                <Button onClick={() => setOpenDeleteChat(true)} text="Delete" icon={Trash} />
                            </div>
                        )
                    }
                </div>


                {/* User Info */}

                <div className="md:flex gap-1 hidden">
                    {
                        // seperator
                        id &&
                        (
                            <div className="h-8 border-[1px] border-gray-500 mx-2"></div>
                        )
                    }

                </div>
                <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                </SignedIn>
                
            </div>
        </div>
    )
}

export default React.memo(AIHeader)