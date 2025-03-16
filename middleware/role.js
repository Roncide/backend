exports.authorize = async (req, res, next) => {
    try {
      const role = req.user.role;
      if (role !== 'admin' && role !== 'chapterPresident') {
        return res.status(403).json({ message: 'Forbidden' });
      }
      next();
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  
