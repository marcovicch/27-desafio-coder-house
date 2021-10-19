import passport from 'passport';
import Config from '../config';
import { Request, Response, NextFunction } from 'express';
import { 
  VerifyFunction, 
  StrategyOption, 
  Strategy as FaceBookStrategy, 
} from 'passport-facebook';

const argumentos = process.argv.splice(2);


const strategyOptions: StrategyOption = {
  clientID: argumentos[0] || Config.FACEBOOK_APP_ID,
  clientSecret: argumentos[1] || Config.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:8080/api/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos', 'emails'],
};

console.log(strategyOptions); 

const loginFunc: VerifyFunction = async (
  accessToken,
  refreshToken,
  profile,
  done
) => {
  // console.log('SALIO TODO BIEN');
  // console.log(accessToken);
  // console.log(refreshToken);
  // console.log(profile);
  return done(null, profile);
};

passport.use(new FaceBookStrategy(strategyOptions, loginFunc));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj: string, cb) {
  cb(null, obj);
});

export const isLoggedIn = (req: Request, res: Response, done: NextFunction) => {
  if (!req.isAuthenticated())
    return res.status(401).json({ msg: 'Unathorized' });

  done();
};

export default passport;
