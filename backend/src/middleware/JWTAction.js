require("dotenv").config();
var jwt = require("jsonwebtoken");

const nonSecurePaths = ["/", "/logout", "/register", "/login"];

const createJWT = (payload) => {
  const key = process.env.JWT_SECERT;
  let token = null;
  try {
    token = jwt.sign(payload, key, { expiresIn: "1h" });
  } catch (error) {
    console.log(error);
  }
  return token;
};

const vertifyToken = (token) => {
  let key = process.env.JWT_SECERT;
  let decoded = null;
  try {
    decoded = jwt.verify(token, key);
  } catch (error) {
    console.log(error);
  }
  return decoded;
};

function extractToken(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
}

const checkUserJWT = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next();

  let cookies = req.cookies;
  const tokenFromHeadr = extractToken(req);
  if ((cookies && cookies.jwt) || tokenFromHeadr) {
    let token = cookies?.jwt || tokenFromHeadr;
    let decoded = vertifyToken(token);
    if (decoded) {
      req.user = decoded;
      req.token = token;
      next();
    } else {
      return res.status(401).json({
        // 401- CHUA DANG NHAP
        EC: -1,
        DT: "",
        EM: "Not authentication the user",
      });
    }
  } else {
    return res.status(401).json({
      // 401- CHUA DANG NHAP
      EC: -1,
      DT: "",
      EM: "Not authentication the user",
    });
  }
};

const checkUserPermission = (req, res, next) => {
  if (nonSecurePaths.includes(req.path) || req.path === "/account")
    return next();
  if (req.user) {
    let email = req.user.email;
    let roles = req.user.groupWithRoles.Roles;
    let currentUrl = req.path;
    if (!roles || roles.length === 0) {
      return res.status(403).json({
        //403 khong co quyern truy cap tai nguyen
        EC: -1,
        DT: "",
        EM: "You don't peermission to access this resource...",
      });
    }
    let canAccess = roles.some(
      (item) => item.url === currentUrl || currentUrl.includes(item.url)
    ); // urrentUrl.includes(item.url) => fix: path= /role/by-group/4 ss /role/by-group => true
    if (canAccess) {
      next();
    } else {
      return res.status(403).json({
        EC: -1,
        DT: "",
        EM: "You don't peermission to access this resource...",
      });
    }
  }
};

export { createJWT, vertifyToken, checkUserJWT, checkUserPermission };
