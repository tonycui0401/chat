
/* eslint-disable consistent-return */
/* eslint-disable radix */
const Router = require('express-promise-router');
// const passport = require('passport');
const _ = require('lodash');
// const crypto = require('crypto');
// const nodemailer = require('nodemailer');
// const auth = require('../../components/auth/helpers');


module.exports = (app) => {
  const router = Router();
  const users = require('../../components/users')(app);
  const candidateProfile = require('../../components/candidate')(app);
  const candidateEducation = require('../../components/candidate/education')(app);
  const candidateExperience = require('../../components/candidate/experience')(app);
  const candidateBenefit = require('../../components/candidate/benefit')(app);
  const candidateView = require('../../components/candidate/view')(app);
  const profileType = require('../../components/profiletype')(app);


  // router.post('/send', async (req, res) => {
  //   const link = `http://reecho-frontend.s3-website-eu-west-1.amazonaws.com/register?email=${req.body.to}`;

  //   const smtpTransport = nodemailer.createTransport({
  //     service: 'Gmail',
  //     auth: {
  //       user: process.env.EMAIL_USER,
  //       pass: process.env.EMAIL_PASS
  //     }
  //   });

  //   const mailOptions = {
  //     from: '"The ReEcho Team" <users@reecho.com>', // TODO: email sender
  //     to: req.body.to, // TODO: email receiver
  //     subject: 'Please confirm your Email account',
  //     // text: 'Wooohooo it works!!',
  //     html: `<head><link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins"><style> h1 { color: red;} img {width:130px;height:45px;} body {font-family: Poppins;} a {text-decoration: none;} #logo {position: relative;}#verify-btn {font-weight: 600;color: white;background-color: #1254e7;padding: 0.5em;padding-left: 1em;padding-right: 1em;border-radius: 5px;display: inline-block;margin-top: 1em;}</style></head><body style="font-family: Poppins;"><div id="email" style="align: center; margin: auto; font-family: Poppins, Helvetica;"><div id="content"><div id="logo" style="position: relative;"><img src="cid:unique@cheng.ee"/ style="width:130;height:45;"></div><div id="content" style="padding-left: 20px;"><div id="title" style="font-weight:600;font-size: 1.8em;">Hey, just one click</div>  <p id="text style="font-size: 1.3em;">Verify your email – and create a new kind of profile</p>  <a href="${link}" class="btn" id="verify-btn">Verify my email</a></div></div></div></body>`,
  //     // template: 'index',
  //     attachments: [
  //       {
  //         filename: 'http://reecho-frontend.s3-eu-west-1.amazonaws.com/logo/ReEcho_Logo.png',
  //         cid: 'unique@cheng.ee',
  //         path: 'http://reecho-frontend.s3-eu-west-1.amazonaws.com/logo/ReEcho_Logo.png'
  //       }
  //     ],

  //   };


  //   smtpTransport.sendMail(mailOptions, (error, response) => {
  //     if (error) {
  //       console.log(error);
  //       // res.end('error');
  //     } else {
  //       console.log(`Message sent: ${response.message}`);
  //       // res.end('sent');
  //     }
  //   });
  // });
  // router.post('/sign_s3', sign_s3.sign_s3);


  // router.post('/login', (req, res) => {
  //   passport.authenticate('local', { session: false }, (err1, user) => {
  //     if (err1 || !user) {
  //       // console.log(err1);
  //       // console.log(user);
  //       res.status(401).json({ message: 'Unauthorized' });
  //       return;
  //     }

  //     req.logIn(user, { session: false }, (err2) => {
  //       if (err2) {
  //         res.send(err2);
  //       } else {
  //         const token = auth.signUser(user);
  //         res.json({ user, token });
  //       }
  //     });
  //   })(req, res);
  // });


  // create table candidate_profile (
  //   id int primary key,
  //   hearAbout text default '',
  //   nextachievements text,
  //   surpriseof text default '',
  //   experience json,
  //   education json,
  //   proudof text default '',
  //   Benefit jsonb
  //   anyimportant text default '',
  //   seekingstatus text default '',
  //   user_id int,
  //   CONSTRAINT FK_UserProfile FOREIGN KEY (user_id) REFERENCES users(id)
  //   )


  router.post('/registerCandidateEducation', auth.authenticate, async (req, res) => {
    console.log(candidateEducation);
    const params = _.pick(req.body, 'degree', 'institution', 'start_date', 'end_date', 'education', 'privacy');
    const ncandidateEducation = await candidateEducation.create(req.user, params);
    return res.json({ ncandidateEducation });
  });

  router.post('/registerCandidateExperience', auth.authenticate, async (req, res) => {
    console.log(candidateExperience);

    const params = _.pick(req.body, 'job_title', 'company', 'start_date', 'end_date', 'experience', 'privacy');
    const ncandidateExperience = await candidateExperience.create(req.user, params);
    return res.json({ ncandidateExperience });
  });

  router.post('/registerCandidateBenefit', auth.authenticate, async (req, res) => {
    const params = _.pick(req.body, 'currentpay', 'expectedpay', 'current_currency', 'expected_currency', 'noticeperiod', 'anyimportant', 'current_type', 'expected_type', 'privacy');
    const ncandidateBenefit = await candidateBenefit.create(req.user, params);
    return res.json({ ncandidateBenefit });
  });


  router.post('/registerProfileType', auth.authenticate, async (req, res) => {
    const params = _.pick(req.body, 'type');
    const nprofileType = await profileType.create(req.user, params);
    return res.json({ nprofileType });
  });


  router.post('/registerCandidateView', auth.authenticate, async (req, res) => {
    const params = _.pick(req.body, 'corder');
    const cview = await candidateView.create(req.user, params);
    return res.json({ cview });
  });


  router.post('/registerCandidateProfile', auth.authenticate, async (req, res) => {
    // const data = await posts.create(req.user, _.pick(req.body, 'title', 'author', 'content'));

    const params = _.pick(req.body, 'hearabout', 'nextachievements', 'surpriseof', 'proudof', 'seekingstatus', 'nextachieve_privacy', 'proudof_privacy', 'surpriseof_privacy');

    // params.password = auth.createHash(params.password);
    // params.email_ref = crypto.randomBytes(20).toString('hex');

    // console.log(candidateProfile);

    // const email_ref = crypto.randomBytes(20).toString('hex');

    // console.log('yes');
    console.log(params);
    // console.log('no');

    // const checkuser = await candidate_profile.getOneByEmail(params.email);

    // if (!checkuser) {
    const ncandidateProfile = await candidateProfile.create(req.user, params);
    return res.json({ ncandidateProfile });

    //   const token = auth.signUser(user);
    //   return res.json({ user, token });
    // }
    // res.status(401).json({ message: 'user exist' });
  });


  router.get('/allCandidateView', async (req, res) => {
    const data = await candidateView.getAll();
    res.json(data);
  });


  router.get('/candidateViewProfile', async (req, res) => {
    const id = parseInt(req.query.id);
    const data = await candidateProfile.get(id);
    res.json(data);
  });

  router.get('/candidateViewView', async (req, res) => {
    const id = parseInt(req.query.id);
    const data = await candidateView.get(id);
    res.json(data);
  });

  router.get('/candidateViewExperience', async (req, res) => {
    const id = parseInt(req.query.id);
    const data = await candidateExperience.get(id);
    res.json(data);
  });

  router.get('/candidateViewEducation', async (req, res) => {
    const id = parseInt(req.query.id);
    const data = await candidateEducation.get(id);
    res.json(data);
  });

  router.get('/candidateViewBenefit', async (req, res) => {
    const id = parseInt(req.query.id);
    const data = await candidateBenefit.get(id);
    res.json(data);
  });


  router.get('/candidateProfile', auth.authenticate, async (req, res) => {
    const data = await candidateProfile.getOne(req.user);
    res.json(data);
  });

  router.get('/candidateView', auth.authenticate, async (req, res) => {
    const data = await candidateView.getOne(req.user);
    res.json(data);
  });

  router.get('/candidateExperience', auth.authenticate, async (req, res) => {
    const data = await candidateExperience.getOne(req.user);
    res.json(data);
  });

  router.get('/candidateBenefit', auth.authenticate, async (req, res) => {
    const data = await candidateBenefit.getOne(req.user);
    res.json(data);
  });


  router.get('/candidateEducation', auth.authenticate, async (req, res) => {
    const data = await candidateEducation.getOne(req.user);
    res.json(data);
  });


  router.get('/profileType', auth.authenticate, async (req, res) => {
    const data = await profileType.getOne(req.user);
    res.json(data);
  });


  // router.post('/register', async (req, res) => {
  //   const params = _.pick(req.body, 'email', 'firstname', 'lastname', 'password', 'phone', 'city', 'country');

  //   params.password = auth.createHash(params.password);
  //   params.email_ref = crypto.randomBytes(20).toString('hex');
  //   // const email_ref = crypto.randomBytes(20).toString('hex');

  //   console.log('yes');
  //   console.log(params);
  //   console.log('no');

  //   const checkuser = await users.getOneByEmail(params.email);

  //   if (!checkuser) {
  //     const user = await users.create(params);
  //     const token = auth.signUser(user);
  //     return res.json({ user, token });
  //   }
  //   res.status(401).json({ message: 'user exist' });
  // });


  router.get('/email', async (req, res) => {
    const data = await users.checkEmailVerify(req.query.email);
    res.json(data);
  });

  router.put('/user_img', auth.authenticate, async (req, res) => {
    const id = parseInt(req.query.id);

    const data = await users.updateImg(id, req.query.user_img);
    res.json(data);
  });

  router.put('/updateUser', auth.authenticate, async (req, res) => {
    const data = await users.update(req.user, _.pick(req.body, 'email', 'phone', 'firstname', 'password', 'lastname', 'city', 'country', 'emailverified', 'userimg'));
    res.json(data);
  });

  router.put('/updateCandidateView', auth.authenticate, async (req, res) => {
    const id = parseInt(req.query.id);
    const data = await candidateView.update(id, _.pick(req.body, 'corder'));
    res.json(data);
  });


  router.put('/updateCandidateProfile', auth.authenticate, async (req, res) => {
    const id = parseInt(req.query.id);
    const data = await candidateProfile.update(id, _.pick(req.body, 'hearabout', 'nextachievements', 'surpriseof', 'proudof', 'seekingstatus', 'nextachieve_privacy', 'proudof_privacy', 'surpriseof_privacy'));
    res.json(data);
  });


  router.put('/updateCandidateEducation', auth.authenticate, async (req, res) => {
    const id = parseInt(req.query.id);
    const data = await candidateEducation.update(id, _.pick(req.body, 'degree', 'institution', 'start_date', 'end_date', 'education', 'privacy'));
    res.json(data);
  });


  router.put('/updateCandidateExperience', auth.authenticate, async (req, res) => {
    const id = parseInt(req.query.id);
    const data = await candidateExperience.update(id, _.pick(req.body, 'job_title', 'company', 'start_date', 'end_date', 'experience', 'privacy'));
    res.json(data);
  });


  router.put('/updateCandidateBenefit', auth.authenticate, async (req, res) => {
    const id = parseInt(req.query.id);
    const data = await candidateBenefit.update(id, _.pick(req.body, 'currentpay', 'current_currency', 'expectedpay', 'expected_currency', 'noticeperiod', 'anyimportant', 'current_type', 'expected_type', 'privacy'));
    res.json(data);
  });


  router.get('/me', auth.authenticate, (req, res) => res.json(req.user));

  return router;
};
