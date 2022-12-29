import { http } from "../utils";
import { makeAutoObservable, runInAction } from "mobx";
class comment {
    commentList = []
    // 记录对应的评论状态，与commentList等长，记录每个的rootId和回复的commentId
    markCommentReply = []
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
            this.markCommentReply.push({
                rootId: commentId,
                commentId: commentId
            })
        })
    }
    // 获取评论列表
    findReplyById (rootId) {
        let res = this.reList.find((item) => item.rootId === rootId)
        return res === undefined ? res : res.data
    }
    // 获取评论列表里的某个回复
    findReplyItemById (rootId, preId) {
        let res = {}
        let list = this.findReplyById(rootId)
        if (list !== undefined) {
            res = list.find((item) => item.commentId === preId)
        }
        return res
    }
    // 根据Id获取评论列表里的子项
    findItemById (rootId, commentId) {
        let res = {}
        let list = this.findReplyById(rootId)
        if (list !== undefined) {
            res = list.find((item) => item.commentId === commentId)
        }
        return res
    }
    // 点击回复时修改状态
    setCommentReplyId (rootId, commentId) {
        let obj = this.markCommentReply.find((item) => item.rootId === rootId)
        obj.commentId = commentId
    }
    // 获取当前回复的状态
    getCurrentReply (rootId) {
        let obj = this.markCommentReply.find((item) => item.rootId === rootId)
        return obj === undefined ? rootId : obj.commentId
    }
}
export default comment