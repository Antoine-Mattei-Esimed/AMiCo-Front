import BaseController from "./basecontroller.js";

class IndexController extends BaseController {
    constructor() {
        super()
    }

    sayHello() {
        this.toast("bonjourToast")
    }
}

export default () => window.indexController = new IndexController()
