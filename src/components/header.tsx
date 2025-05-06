import Link from "next/link";
import { usePathname } from 'next/navigation';


export function Header() {
    const pathname = usePathname();
    const isHistoryPage = pathname === '/history';
    const isHomePage = pathname === '/home';
    return (
        <header className="bg-gray-100 p-4 shadow-md flex items-center justify-between relative">
            <img src={"/logo.png"} className="w-50" ></img>
            {isHistoryPage && (
                <Link href={"/home"} className="text-2xl font-bold bg-gray-600 text-white ml-4 border-2 rounded-2xl p-2 hover:border-gray-900 transition duration-300 ease-in-out ">
                    Home
                </Link>
            )}
            
            {isHomePage && (
                <Link href={"/history"} className="text-2xl font-bold bg-gray-600 text-white ml-4 border-2 rounded-2xl p-2 hover:border-gray-900 transition duration-300 ease-in-out">
                    History
                </Link>
            )}
        </header>
    ); 
}