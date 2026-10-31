import { Router } from "express";
import EntityNotFoundError from "../errors/EntityNotFoundError.mts";
import UserService from "../services/user.service.mts"
import { sanitize } from "../services/utils.mts";
import userService from "../services/user.service.mts";
import authorize from "../middleware/authorize.mts";

const router: Router = Router();

router.post('/login', async (req, res, next) => {
    // get the email and password from the body of the request
    const cleanBody = sanitize(req.body);

    // sanitize them
    const cleanEmail = cleanBody.email;
    const cleanPassword = cleanBody.password;

    // call the service function, pass in the email and password.
    const userInfo = await UserService.login(cleanEmail, cleanPassword)
    const user = userInfo.user
    const token = userInfo.token
    // the service function should return a valid user and token  or null for either

    // forward a 401 error if either is null
    if (!token || !user) {
        return next(new EntityNotFoundError({
            message: 'Login invalid', code: 'ERR_VALID',
            statusCode: 401
        }))
    } else if (token && user) {
        // if both values exist, Send back the token and some user info in the response 
        res.status(200).json({ token: token, user: { _id: user._id, email: user.email, name: user.name } });
    }
});

router.post('/users', async (req, res, next) => {

    try {
        const cleanBody = sanitize(req.body)

        const email = cleanBody.email
        const password = cleanBody.password
        const name = cleanBody.name

        const newUser = await userService.register(email, password, name)
        res.status(200).json({ message: "User created successfully", userId: newUser.insertedId });
    } catch (err) {
        next(err)
    }
});

// Protect a route with JWT authentication. Note the authorize middleware! Make sure to import it as well.
router.get('/protected', authorize, (req, res) => {
    console.log(res.locals.user)
    res.json({ message: `Hello, ${res.locals.user.email}!` });
});

export default router;