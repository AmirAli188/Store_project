const Controller = require("../controller");

const HomeController = new class HomeController extends Controller {
    indexPage(req , res , next){
        return res.status(200).json({
            message : "به سایت ما خوش آمدید"
        })
    }
}
module.exports = {
    HomeController 
}