export const verfiyManger = (req, res, next) => {
    if (!req.user.ismanger) {
        return res.status(403).json({ success: false, message: 'Access denied. Only Manger are allowed.' });
    }
    next();
};