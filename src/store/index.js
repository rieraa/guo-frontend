import React from 'react'
import CommentStore from './commentStore'
class RootStore {
    constructor() {
        this.CommentStore = new CommentStore()
    }
}

// 实例化根
// 导出useStore context

const rootStore = new RootStore()
const context = React.createContext(rootStore)

const useStore = () => React.useContext(context)

export { useStore }