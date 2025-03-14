
import {LogOut, Settings} from "lucide-react"
import logo from "@/assets/logo-angkut-ternak-biru.svg";
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Navbar } from "@/components/ui/navbar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Outlet } from "react-router-dom"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  

export default function DashboardLayout() {
  return ( 
      <section
        className="h-screen flex items-stretch"
      >
        <section className="w-64 border-r bg-primary-foreground text-primary">
            <div className="max-w-[980px] w-full p-2 space-y-1">
                 
                    <div className="flex flex-col items-center space-y-4">
                      <img src={logo} alt="logo" className="w-110 h10" /> {/* Logo */}
                      {
                        <div className={cn("flex items-center justify-center h-15", " text-[rgb(61,140,190)] text-lg font-serif font-bold")}>
                            CMS Dashboard 
                        </div>
}

            </div>
          </div>
          <Separator />
          <Navbar
            links={[
              {
                title: "Settings",
                label: "",
                icon: Settings,
                variant: "default",
              },
            ]}
          />
          <Separator />
        </section>
        <section className="flex-1">
            <div className="min-h-18 py-4 px-8 flex justify-end">
<DropdownMenu>
  <DropdownMenuTrigger>            <Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>AT</AvatarFallback>
</Avatar></DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-red-600"><LogOut/>Keluar</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
            </div>
            <div className="py-2 px-8"> </div>
            <Outlet />
        </section>
      </section>
  )
}