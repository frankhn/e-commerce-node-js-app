import express from 'express';
import Department from '../../../controllers/department';

const router = express.Router();

// create car instance
const department = new Department();

// get all departments
router.get('/', department.allDepartments);

// get one department
router.get('/:departmentID(\\d+)', department.department);


export default router;
