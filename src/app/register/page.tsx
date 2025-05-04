import RegisterBanner from "@/components/register/registerBanner";
import RegisterBox from "@/components/register/registerBox";

export default function Register() {
    return (
        <div className="flex items-center justify-center h-screen w-screen fixed bg-gray-900">
            <div className="flex flex-row  justify-center shadow-2xl">
                <RegisterBox />
                <RegisterBanner />
            </div>
        </div>
    );
}