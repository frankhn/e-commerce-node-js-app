class User {
  /**
     * @author frank
     * @param {*} req
     * @param {*} res
     * @returns {*} user
     */
  async register(req, res) {
    const { name, email, password } = req.body;
    try {
      const user = await CustomerModel.create(email, name, password);
      res.status(201).json({
        status: 201,
        user: user.getAsJsonObject('customer').remove('password')
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        mesg: error.message
      });
    }
  }
 
/**
  * @author frank harerimana
  * @param {*} req
  * @param {*} res
  * @returns {*} user
  */


async signup(req, res) {
 
}
/**
 * 
 * @param {create a meetup} req 
 * @param {*returns success if created} res 
 */
async login(req, res) {
  
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async logout(req, res) {
    
}

}

export default User;

