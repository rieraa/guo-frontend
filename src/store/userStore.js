import { http } from "../utils";
import { makeAutoObservable, runInAction } from "mobx";
class userinfo {
    userinfo = {}
    constructor() {
        makeAutoObservable(this)
    }
    async getUserinfo () {
        const res = http.get('/user/userinfo')
        runInAction(() => {
            this.userinfo = res.data
        })
        return res
    }

}
export default userinfo