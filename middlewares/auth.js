// import { verifyAccessToken } from "../config/jwt";
// const publicRoutes = [ "/auth/login", "/auth/register"];

// export const authMiddleware = (res, req, next) => {
//     if (publicRoutes.includes(req.path)) {
//         return next();
//     }

//     const [type, token] = req.headers.authorization?.split(" ") || [];
//     if (!token || type !== "Bearer") {
//         return res.status(401).json({ message: "Unauthorized"});
//     }
//     req.user = verifyAccessToken(token);
//     next();
//     }