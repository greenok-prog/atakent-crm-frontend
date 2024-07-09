import type { AuthResponse, User } from "~/types/user"

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            user:{} as User,
            isLoggedIn:false
        } 
    },
    actions:{
        setUser(user:User){
            this.user = user
            this.isLoggedIn = true
        },
        login(data:AuthResponse){
            const refresh = useCookie('refreshToken')
            refresh.value = data.refresh_token
            const accessToken = useCookie('accessToken')
            accessToken.value = data.access_token
            this.setUser(data.user)
        },
        async logout(){
            const refresh = useCookie('refreshToken')
            refresh.value = null
            const accessToken = useCookie('accessToken')
            accessToken.value = null
            await navigateTo('/')
        }
    },
    getters:{
        userIsAdmin: (state) => {
            if(state.isLoggedIn){
                return state.user?.roles.includes('ADMIN')
            }
            return false
        },
        userIsManager: (state) =>state.user ? state.user?.roles.includes('MANAGER') : false
    }
})