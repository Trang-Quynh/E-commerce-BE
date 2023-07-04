export const staffAuth = (req, res, next) => {
    if (req.decode.role === 'staff') {
        next();
    } else {
        // res.status(401).send('Unauthorized');
    }
}