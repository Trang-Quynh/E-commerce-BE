export const adminAuth = (req,res, next) => {
    if (req.decode.role === 'admin') {
        next();
    } else {
        res.status(401).send('unauthorized');
    }
}