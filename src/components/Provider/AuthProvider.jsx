import $fetch from "@/lib/fetch";
import React, { useContext, useEffect, useState } from "react"
import { Navigate, Outlet, useNavigate } from "react-router-dom"

const AuthContext  = React.createContext({
        profile: null,
        login: async() => {},
        logout: () => {},
        isLoading: true

});

export const Authprovider = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState ();
    const [isLoading, setIsLoading] = useState(true);


    async function login(value) {
        const loginResponse = await $fetch.create("/api/login", value);
      localStorage.setItem("access_token", loginResponse.data.token); 
      await getProfile();
      navigate('/dashboard/setting');
    }
 
    
    async function getProfile() {
        try {
          const profileResponse = await $fetch.get("/api/user");
          setProfile(profileResponse.data);
        } catch {
          logout();
        }
      }
    function logout(){
        localStorage.removeItem("access_token")
        setProfile(null);
        Navigate('/');
      }

      useEffect(() => {
        // check access token exist?
        // get profile
        async function checkProfile() {
          setIsLoading(true);
          if (localStorage.getItem("access_token")) {
            await getProfile();
          }
          setIsLoading(false);
        }
    
        checkProfile();
      }, []);
    
    
      const store = {
        profile,
        login,
        logout,
        isLoading,
      }
    return (
        <AuthContext.Provider value = {store}  >
            <Outlet /> 
        </AuthContext.Provider>
    );
};

export function useAuth(){
    return useContext (AuthContext);
}
