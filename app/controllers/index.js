import BaseController from "./basecontroller.js";
import MyModel from "../model/model.js";

class IndexController extends BaseController {
    constructor() {
        super()
        this.model = new MyModel()
    }

    sayHello() {
        this.toast("bonjourToast")
    }
}

export default () => window.indexController = new IndexController()
