exports.authorize = async (req, res, next) => {
    try {
         // Ensure req.user is defined
      if (!req.user) {
          return res.status(401).json({ message: 'Unauthorized' });
      }
        
      const role = req.user.role;
              // Check if the role is 'admin' or 'chapterPresident'
      if (role !== 'admin' && role !== 'chapterPresident') {
        return res.status(403).json({ message: 'Forbidden' });
      }
        
      // Proceed to the next middleware if authorized
      next();
    } catch (error) {
          // Handle unexpected errors
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  
