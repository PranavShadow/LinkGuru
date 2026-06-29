import { error } from "console";
import { supabase } from "./supabase";
import bcrypt from "bcryptjs";

export async function signUpUser(name: string, email: string, password: string){
    const{data:existing} = await supabase.from("users")
    .select("id")
    .eq("email", email)
    .single()

    if(existing)
        return { error: "User Already exists"}

    const password_hash = await bcrypt.hash(password,10);

    const {error} = await supabase.from("users")
    .insert({
        name,
        email,
        password_hash,
        provider : "credentials"
    })

    if(error) return { error : error.message}
    return {success : true}
}