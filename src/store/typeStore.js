import { http } from "../utils";
import { makeAutoObservable, runInAction } from "mobx";
class typestore {
    types = []
    constructor() {
        makeAutoObservable(this)
    }

}
export default typestore