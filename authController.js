class authController {
    async registration(req, res) {
        try {
            
        } catch (error) {
            console.log(error);
        }
    }

    async login(req, res) {
        try {
            
        } catch (error) {
            console.log(error);
        }
    }

    async getUsers(req, res) {
        try {
            res.json('Done')
        } catch (error) {
            console.log(error);
        }
    }
}

export default new authController();