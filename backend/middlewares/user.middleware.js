const ValidateRegister = (req, res, next) => {

    const { firstName, email, password } = req.body;


    console.log(firstName, email, password);

    if (firstName.length < 3) {
        return res.status(400).json({ message: 'First name must be at least 3 characters long.' });
    }
    if (!email || typeof email !== 'string' || email.length < 6) {
        return res.status(400).json({ message: 'Email must be a valid string with at least 6 characters.' });
    }
    if (!password || typeof password !== 'string' || password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
    }

    next();
};

const validateSignIn = (req,res, next)=>
{
    const { email, password } = req.body;

    if (!email || typeof email !== 'string' || email.length < 6) {
        return res.status(400).json({ message: 'Email must be a valid string with at least 6 characters.' });
    }
    if (!password || typeof password !== 'string' || password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
    }

    next();
}

module.exports = { ValidateRegister, validateSignIn };