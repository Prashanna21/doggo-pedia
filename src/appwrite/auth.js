import {Client, Account, ID} from 'appwrite'

const appwriteProjectId = import.meta.env.VITE_APPRWRITE_PROJECT_ID

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
            .setProject(appwriteProjectId)
        this.account = new Account(this.client)
    }

    async userExist(){
        try{
            console.log("test")
            const userData = await this.account.get()
            return userData
        }
        catch(error){
            console.log("not logged in")
        }
    }

    async createAccount({username, email, password}){
         try {
            const userAccount = await this.account.create(ID.unique(), email, password,username)
            if(userAccount){
                this.login({email, password})
                return userAccount
            }
            else{
                console.log("account creation failed")
            }
        } catch (error) {
           throw error
        }
    }

    async login({email, password}){
        try {
            await this.account.createEmailPasswordSession(email, password)
            const userAccount = await this.account.get();
            return userAccount
        } catch (error) {
            throw error
        }
    }

    async logout(){
        try{
            await this.account.deleteSessions()
        }
        catch(error){
            throw error
        }
    }
}

const authService = new AuthService()

export default authService;