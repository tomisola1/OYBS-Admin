import Sidebar from "@/components/Sidebar"



export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
    <section>
        <div className="flex h-auto min-h-screen">
            <div className="w-[282px] min-h-screen bg-background sticky top-0 left-0">
                <Sidebar/>
            </div>
            <div className="h-screen w-[90%] py-6 px-5">
                {children}
            </div>
        </div>
    </section>
    )
  }