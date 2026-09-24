import Footer from "@/components/layout/public/Footer";
import Header from "@/components/layout/public/Header";
import { ReactNode } from "react";

export default function Layout({children} : {children : ReactNode}){
    return(
        <div className="flex flex-col min-h-screen">
            {/* <h1>Public Layout</h1> */}
            <Header></Header>
            <main className="flex-1">
                {children}
            </main>
            <Footer></Footer>
        </div>
    )
}
