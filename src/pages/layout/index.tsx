import Sitebar from "./../../components/sitebar.tsx";
import { Outlet } from "react-router-dom";
export default function Layout(){
    const users = window.sessionStorage.getItem('token');
    if (users) {
        return (
            <div className="bg-white"> 
                <div className="flex">
                    <Sitebar/>
                    <div className="w-full">
                        <div className="navbar h-[80px] bg-white flex justify-between">
                            <h1 className="font-bold text-[30px] text-white pl-[40px]">hello 👋</h1>
                            <button className="btn rounded-full">John</button>
                        </div>
                        <div className="w-full">
                            <main className="max-w-[1440px] mx-auto mt-[30px]">
                                <Outlet/>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        window.location.replace('/login')
    }
} 