import { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
    session: {
        strategy: "jwt",
    },
    providers: []
}


// add this into Login Form

/*
import { signIn, signout} from "@/auth";

export async function doLogout() {
    await signOut({ redirectTo: "/" })
}

export async function doCredentialsLogin(formData : FormData): Promise<any> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        const response = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });
        return response;
    } catch (err: any) {
        throw err;
    }
}
    */