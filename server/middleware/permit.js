const permit = (allowed) => {
  return (req, res, next) => {
    const role = req.role;
    if (allowed.includes(role)) {
      next();
    } else {
      return res.json({ msg: "You don't have Permission" });
    }
  };
};

module.exports = permit;
