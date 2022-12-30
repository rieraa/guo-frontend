import React from 'react'
import CommentStore from './commentStore'
import UserStore from './userStore'
class RootStore {
    constructor() {
        this.CommentStore = new CommentStore()
        this.UserStore = new UserStore()
    }
}

// 实例化根
// 导出useStore context

const rootStore = new RootStore()
const context = React.createContext(rootStore)

const useStore = () => React.useContext(context)

export { useStore }