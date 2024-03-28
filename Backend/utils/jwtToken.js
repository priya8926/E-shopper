//create token and save in cookie
const setToken = (user , statuscode , res)=>{
    const token = user.jsonwebtoken()

    // options for cookie
    const options = {
        expires : new Date(
            Date.now() + process.env.COOKIE_EXPIRE *24*60*60*1000
        ),
        httpOnly : true,
    }
    res.status(statuscode).cookie("token" , token , options).json({
        success :  true, user , token
    })
}
module.exports = setToken