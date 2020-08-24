/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
const Router = require('express-promise-router');
const _ = require('lodash');
const Tags = require('../../components/tags');
// const auth = require('../../components/auth/helpers');

module.exports = (app) => {
  const router = Router();
  const tags = Tags(app);

  // Create
  router.post('/createHearabout', async (req, res) => {
    // res.json(req.body);
    const hearabout = await tags.getOneHearabout(req.body.title);
    if (!hearabout[0]) {
      const data = await tags.createHearabout(_.pick(req.body, 'title'));
      res.json(data);
    } else {
      res.json('equal');
    }

    // const data = await tags.createHearabout(_.pick(req.body, 'title'));
    // res.json(data);
  });


  router.post('/createJobTag', async (req, res) => {
    // res.json(req.body);
    const jobtag = await tags.getOneJobTag(req.body.title);
    if (!jobtag[0]) {
      const data = await tags.createJobTag(_.pick(req.body, 'title'));
      res.json(data);
    } else {
      res.json('equal');
    }
  });

  router.post('/createSkillTag', async (req, res) => {
    // res.json(req.body);
    const skilltag = await tags.getOneSkillTag(req.body.title);
    if (!skilltag[0]) {
      const data = await tags.createSkillTag(_.pick(req.body, 'title'));
      res.json(data);
    } else {
      res.json('equal');
    }
  });

  router.post('/createEmployerTag', async (req, res) => {
    // res.json(req.body);
    const employertag = await tags.getOneEmployerTag(req.body.title);
    if (!employertag[0]) {
      const data = await tags.createEmployerTag(_.pick(req.body, 'title'));
      res.json(data);
    } else {
      res.json('equal');
    }
  });


  router.post('/createImportantTag', async (req, res) => {
    // res.json(req.body);
    const importanttag = await tags.getOneImportantTag(req.body.title);
    if (!importanttag[0]) {
      const data = await tags.createImportantTag(_.pick(req.body, 'title'));
      res.json(data);
    } else {
      res.json('equal');
    }
  });


  router.post('/createLocationTag', async (req, res) => {
    // res.json(req.body);
    const locationtag = await tags.getOneLocation(req.body.title, req.body.country);
    if (!locationtag[0]) {
      const data = await tags.createLocationTag(_.pick(req.body, 'title', 'country'));
      res.json(data);
    } else {
      res.json('equal');
    }
  });


  // Delete
  router.delete('/deleteHearabout/:text', async (req, res) => {
    const hearabout = await tags.getOneHearabout(req.params.text);
    if (hearabout[0]) {
      const data = await tags.deleteHearabout(req.params.text);
      res.json('deleted');
    } else {
      res.json('no record');
    }
  });


  // router.delete('/deleteHearabout', async (req, res) => {
  //   const hearabout = await tags.getOneHearabout(req.params.text);
  //   if (hearabout[0]) {
  //     const data = await tags.deleteHearabout(req.query.text);
  //     res.json('deleted');
  //   } else {
  //     res.json('no record');
  //   }
  // });


  // router.delete('/deleteJobTag', async (req, res) => {
  //   const hearabout = await tags.getOneHearabout(req.params.text);
  //   if (hearabout[0]) {
  //     const data = await tags.deleteHearabout(req.query.text);
  //     res.json('deleted');
  //   } else {
  //     res.json('no record');
  //   }
  // });

  // router.delete('/deleteSkillTag/', async (req, res) => {
  //   const hearabout = await tags.getOneHearabout(req.params.text);
  //   if (hearabout[0]) {
  //     const data = await tags.deleteHearabout(req.query.text);
  //     res.json('deleted');
  //   } else {
  //     res.json('no record');
  //   }
  // });

  // router.delete('/deleteEducation/', async (req, res) => {
  //   const hearabout = await tags.getOneHearabout(req.params.text);
  //   if (hearabout[0]) {
  //     const data = await tags.deleteHearabout(req.query.text);
  //     res.json('deleted');
  //   } else {
  //     res.json('no record');
  //   }
  // });

  // router.delete('/deleteImportantTag/', async (req, res) => {
  //   const hearabout = await tags.getOneHearabout(req.params.text);
  //   if (hearabout[0]) {
  //     const data = await tags.deleteHearabout(req.query.text);
  //     res.json('deleted');
  //   } else {
  //     res.json('no record');
  //   }
  // });

  // router.delete('/deleteDegreeTag/', async (req, res) => {
  //   const hearabout = await tags.getOneHearabout(req.params.text);
  //   if (hearabout[0]) {
  //     const data = await tags.deleteHearabout(req.query.text);
  //     res.json('deleted');
  //   } else {
  //     res.json('no record');
  //   }
  // });

  // router.delete('/deleteImportantTag/', async (req, res) => {
  //   const hearabout = await tags.getOneHearabout(req.params.text);
  //   if (hearabout[0]) {
  //     const data = await tags.deleteHearabout(req.query.text);
  //     res.json('deleted');
  //   } else {
  //     res.json('no record');
  //   }
  // });


  router.post('/createInstitutionTag', async (req, res) => {
    // res.json(req.body);
    const institutiontag = await tags.getOneInstitutionTag(req.body.title);
    if (!institutiontag[0]) {
      const data = await tags.createInstitutionTag(_.pick(req.body, 'title'));
      res.json(data);
    } else {
      res.json('equal');
    }
  });


  router.post('/createDegreeTag', async (req, res) => {
    // res.json(req.body);
    const degreetag = await tags.getOneDegreeTag(req.body.title);
    if (!degreetag[0]) {
      const data = await tags.createDegreeTag(_.pick(req.body, 'title'));
      res.json(data);
    } else {
      res.json('equal');
    }
  });


  router.post('/createRoleTag', async (req, res) => {
    // res.json(req.body);
    const roletag = await tags.getOneRoleTag(req.body.title);
    if (!roletag[0]) {
      const data = await tags.createRoleTag(_.pick(req.body, 'title'));
      res.json(data);
    } else {
      res.json('equal');
    }
  });


  router.post('/createEducationTag', async (req, res) => {
    // res.json(req.body);
    const educationtag = await tags.getOneEducationTag(req.body.title);
    if (!educationtag[0]) {
      const data = await tags.createEducationTag(_.pick(req.body, 'title'));
      res.json(data);
    } else {
      res.json('equal');
    }
  });


  /**
 * @swagger
 *
 * /login:
 *   post:
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */
  router.get('/allTags', async (req, res) => {
    const skillData = await tags.getSkillTag();
    const locationData = await tags.getlocationTag();
    const jobData = await tags.getJobTag();
    const expertiseData = await tags.getexpertiseTag();
    const sectorData = await tags.sector_tag();
    const employerData = await tags.getEmployerTag();
    const businessData = await tags.business_tag();
    const hearaboutData = await tags.hearabout_tag();
    const importantData = await tags.important_tag();
    const newhearaboutData = [...skillData, ...jobData, ...expertiseData, ...sectorData, ...employerData, ...businessData, ...hearaboutData, ...importantData, ...locationData];
    res.json(newhearaboutData);
  });

  router.get('/skillTags', async (req, res) => {
    const skillData = await tags.getSkillTag();
    const expertiseData = await tags.getexpertiseTag();
    const sectorData = await tags.sector_tag();
    const businessData = await tags.business_tag();
    const newskillData = [...skillData, ...expertiseData, ...sectorData, ...businessData];
    res.json(newskillData);
  });

  router.get('/employerTags', async (req, res) => {
    const employerData = await tags.getEmployerTag();
    res.json(employerData);
  });

  router.get('/jobTags', async (req, res) => {
    const jobData = await tags.getJobTag();
    res.json(jobData);
  });

  router.get('/locationTags', async (req, res) => {
    const locationData = await tags.getlocationTag();
    res.json(locationData);
  });

  router.get('/importantTags', async (req, res) => {
    const importantData = await tags.important_tag();
    res.json(importantData);
  });

  router.get('/loadJobTags', async (req, res) => {
    const loadedJobData = await tags.loadJobTag();
    // res.json(loadedJobData);
  });


  router.get('/institutionTags', async (req, res) => {
    const institutionData = await tags.getInstitutionTag();
    res.json(institutionData);
  });

  router.get('/degreeTags', async (req, res) => {
    const degreeData = await tags.getDegreeTag();
    res.json(degreeData);
  });

  router.get('/roleTags', async (req, res) => {
    const roleData = await tags.getRoleTag();
    res.json(roleData);
  });

  router.get('/educationTags', async (req, res) => {
    const educationData = await tags.getEducationTag();
    res.json(educationData);
  });

  router.get('/employerTags', async (req, res) => {
    const employerData = await tags.getEmployerTag();
    res.json(employerData);
  });


  // Get one
  //   router.get('/:id(\\d+)', auth.authenticate, async (req, res) => {
  //     const data = await posts.getOne(req.params.id);
  //     res.json(data);
  //   });

  //   // Update
  //   router.put('/:id(\\d+)', auth.authenticate, async (req, res) => {
  //     const data = await posts.update(req.params.id, _.pick(req.body, 'content', 'title'));
  //     res.json(data);
  //   });

  //   // Delete
  //   router.delete('/:id(\\d+)', auth.authenticate, async (req, res) => {
  //     const data = await posts.delete(req.params.id);
  //     res.json(data);
  //   });

  return Router().use('/tags', router);
};
