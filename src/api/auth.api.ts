import apiClient from "@/lib/apiClient";

export function userLogin(payload : {email:string, password: string}){
    return apiClient("/auth/login",{
        method:"POST",
        body:payload
    });
}

export function userLogout(){
    return apiClient("/auth/logout",{
        method:"POST",
    });
}

export function getMyProfile(){
    return apiClient("/auth/me");
}

export function googleOAuth(payload:{idToken : string}){
    return apiClient("/auth/google",{body: payload});
}
