import { http } from "../utils";
import { makeAutoObservable, runInAction } from "mobx";
class chapterStore {
    commentList = []
    // 记录对应的评论状态，与commentList等长，记录每个的rootId和回复的commentId
    markCommentReply = []
    reList = []
    constructor() {
        makeAutoObservable(this)
    }

}
export default chapterStore