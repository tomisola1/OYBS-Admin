"use client"

import ProtectedRoute from "@/components/ProtectedRoute"
import Sidebar from "@/components/Sidebar"
import usePortrait from "@/hooks/usePortrait";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { CancelIcon } from "../../../public/assets/icons";



function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const [isOpen, setIsOpen] = useState(true);
	  const portrait = usePortrait();

    return (
    <section>
        <div className="lg:flex h-auto min-h-screen">
            <div className={`w-[282px] min-h-screen bg-background overflow-auto pb-10 lg:sticky fixed top-0 z-50 left-0 ${isOpen ? "block" : "hidden"} transition-all duration-700 ease-in-out`}>            
                <Sidebar close={()=>setIsOpen(false)}/>
            </div>
            <div className={`h-screen lg:w-[90%] py-6 px-5 overflow-auto ${isOpen ? "" : "w-screen"}`}>
              {portrait && (
              <div className="arrow-nav">
                <Bars3Icon
                  onClick={() => setIsOpen((current) => !current)}
                  className="h-6 w-6 flex-shrink-0 text-primary mr-1" aria-hidden="true"
                />
              </div>
              )}
                {children}
            </div>
        </div>
    </section>
    )
  }

  export default ProtectedRoute(DashboardLayout)