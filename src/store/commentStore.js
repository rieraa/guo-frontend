import { http } from "../utils";
import { makeAutoObservable, runInAction } from "mobx";
class comment {
    commentList = []
    reList = []
    constructor() {
        makeAutoObservable(this)
    }
    async getAllCom (chapterId, userId) {
        const res = await http.post('/student/getcomments', {
            chapterId, userId
        });
        runInAction(() => {
            this.commentList = res.data.results
        })
        return res
    }
    async getReById (commentId) {
        const res = await http.get(`/allreply?commentId=${commentId}`)
        runInAction(() => {
            res.rootId = commentId
            this.reList.push(res)
        })
    }
    findReplyById (rootId) {
        let res = this.reList.find((item) => item.rootId === rootId)
        return res === undefined ? res : res.data
    }
    findReplyItemById (rootId, preId) {
        let res = {}
        let list = this.findReplyById(rootId)
        if (list !== undefined) {
            res = list.find((item) => item.commentId === preId)
        }
        return res
    }
}
export default comment