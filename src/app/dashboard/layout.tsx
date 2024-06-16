"use client"

import ProtectedRoute from "@/components/ProtectedRoute"
import Sidebar from "@/components/Sidebar"
import usePortrait from "@/hooks/usePortrait";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useState } from "react";



function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const [isOpen, setIsOpen] = useState(true);
	  const portrait = usePortrait();

    return (
    <section>
        <div className="flex h-auto min-h-screen">
            <div className={`w-[282px] min-h-screen bg-background sticky top-0 left-0 ${isOpen ? "block" : "hidden"}`}>
            {/* {portrait && (
              <div className="arrow-nav">
                <Bars3Icon
                  onClick={() => setIsOpen((current) => !current)}
                  className="h-5 w-5 flex-shrink-0 text-primary mr-1" aria-hidden="true"
                />
              </div>
            )} */}
                <Sidebar/>
            </div>
            <div className={`h-screen w-[90%] w- py-6 px-5 overflow-auto ${isOpen ? "" : "w-screen"}`}>
                <Bars3Icon
                  onClick={() => setIsOpen((current) => !current)}
                  className="h-5 w-5 flex-shrink-0 text-primary mr-1 inline-block" aria-hidden="true"
                />
                {children}
            </div>
        </div>
    </section>
    )
  }

  export default ProtectedRoute(DashboardLayout)