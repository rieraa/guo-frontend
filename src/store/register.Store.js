import { http } from "../utils"
import { makeAutoObservable } from "mobx"
class RegisterStore {
    constructor() {
        makeAutoObservable(this)
    }
    register = async ({ avatar, username, password }) => {
        var time = new Date()
        const retime = time.toLocaleString()
        const res = await http.post('/api/register', {
            username, password, avatar,
            createTime: retime,
            account: null,
            roleId: 0
        })
        return res
    }
}

export default RegisterStore