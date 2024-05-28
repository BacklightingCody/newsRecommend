import { defineStore } from 'pinia'
// import { useUserStore } from './user';
// import { useSidebar } from './sidebar';
export const useStore = defineStore('main', {
    strict:true,
    state: () => ({
            userAccount: { loggedIn: false, accessToken: '' },
            // theme:light
    }),
    actions: {
        setUserAccount(data) {
            this.userAccount = data;
        },
        signUp(userName, userPassWord) {
            this.userAccount.isSignup= true;
            console.log(this.userAccount.isSignup)
        },
        loginIn(userName, userPassWord) {
            const mockResponse = {
                accessToken: '123456789',
                userInfo: {
                    // Name: 'john',
                    phoneNumber: 15735418020,
                    gender: '男',
                    interest: ['soccer game'],
                    Address: 'China',
                    Profession: 'student',
                    Emial: '123456@qq.com',
                    Biography: 'I am a student.',
                }
            };
            this.userAccount.accessToken = mockResponse.accessToken;
            this.userAccount.loggedIn = true;
            console.log(this.userAccount.loggedIn)
            // const userStore = useUserStore();
            // userStore.setUserInfo(mockResponse.userInfo);
        },
        logout() {
            this.userAccount = { loggedIn: false, accessToken: '' };
            console.log(this.userAccount.loggedIn)
            // const userStore = useUserStore();
            // userStore.setUserInfo({});
        }
    }
})
export * from './user'
export * from './sidebar'

