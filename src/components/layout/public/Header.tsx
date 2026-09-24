import Link from "next/link"

export default function Header(){
    const routes =[
        {name:"Home", url:"/"},
        {name:"About us", url:"/about-us"},
    ]
    return(
        // <div>
        //     <h1>Header Component</h1>
        // </div>

        <header className="w-full h-16 border-b flex justify-center items-center">
            <nav className="flex gap-5">
                {
                routes.map((route) => (
                    <Link key={route.url} href={route.url}>
                        {route.name}
                    </Link>
                ))
            }
            </nav>
        </header>
    )
}
