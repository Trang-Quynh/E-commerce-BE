export const sellerAuth = (req, res, next) => {
    if (req.decode.role === 'seller') {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
}