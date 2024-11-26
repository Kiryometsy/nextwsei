'use client'

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LogoutForm(){

    const router = useRouter();
    
    const onSubmit = () => {
        signOut(auth);
        router.push("/");
    };
    
    return(
        <Button onClick={onSubmit} className="mt-20 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign out</Button>
    );
}