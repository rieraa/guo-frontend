import { http } from "../utils";
import { makeAutoObservable, runInAction } from "mobx";
class comment {
    // 存放主评论，一维数组
    commentList = []
    // 记录对应的评论状态，与commentList等长，记录每个主评论的rootId和当前回复的commentId（默认为rootId）
    markCommentReply = []
    // 存放子评论列表，是一个二维数组，只有当点击查看子评论的时候才会加载数据
    reList = []
    // 存放视频资源 
    resource = {}


    constructor() {
        makeAutoObservable(this)
    }
    // 加载所有评论
    async getAllCom (chapterId, userId) {
        const res = await http.post('/student/getcomments', {
            chapterId, userId
        });
        runInAction(() => {
            this.commentList = res.data.results
        })
        return res
    }
    // 根据评论Id加载子评论列表
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
    // 发布评论回复视频
    async publishCom (chapterId, userId, commentContent, username) {
        const res = await http.post('/comment/create', {
            chapterId,
            userId,
            commentContent,
            username
        })
        return res
    }
    // 回复视频评论
    async replyComment (commentContent, userId, username, chapterId, rootId) {
        const preId = this.getCurrentReply(rootId)
        const res = await http.post('/reply', {
            commentContent,
            userId,
            username,
            chapterId,
            rootId,
            preId
        })
        return res
    }
    // 获取视频资源
    async getResource (courseId, chapterId) {
        const res = await http.post('/student/video', {
            courseId, chapterId
        })
        runInAction(() => {
            this.resource = res.data
        })
        return res
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