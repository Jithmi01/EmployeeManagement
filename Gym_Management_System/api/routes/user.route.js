import express from 'express';

const router = express.Router();


router.get('/test',(req, res) => {
  res.json({ message: "api is working" });
});

  router.post('/signout', async (req, res, next) => {
    
    try {
        res
          .clearCookie('access_token')
          .status(200)
          .json('User has been signed out');
      } catch (error) {
        next(error);
      }

  });


export default router;