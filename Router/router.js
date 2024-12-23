const express = require('express')
const router = express.Router()
const userController = require('../Controller/userController')
const projectController = require('../Controller/projectController')
const jwtMiddleware = require('../Middleware/jwtMiddleware')
const multerConfig = require('../Middleware/multerMiddleware')
//register
router.post('/register',userController.register)
router.post('/login',userController.login)
//add projects
router.post('/addprojects',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProject)

//getHome projects

router.get('/homeprojects',projectController.getHomeProjects)

//getAll projects

router.get('/allprojects',jwtMiddleware,projectController.getAllProjects)


//getUser projects

router.get('/userprojects',jwtMiddleware,projectController.getUserProjects)


//edit projects
router.put('/projects/edit/:pid',jwtMiddleware,multerConfig.single('projectImage'),projectController.editProject)

//deleteproject
router.delete('/projects/remove/:pid',jwtMiddleware,projectController.deleteProject)

module.exports = router

