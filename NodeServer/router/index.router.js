const express = require('express');
const router = express.Router();
const ExpenceCtrl = require('../Controllers/ExpensesController');
const MemberCtrl = require('../Controllers/MemberController');
const InstallmentCtrl = require('../Controllers/InstallmentController');
const HistoryCtrl = require('../Controllers/HistoryController');

router.get('/getAllExpences',ExpenceCtrl.getAll);
router.get('/getExpence/:id',ExpenceCtrl.getById);
router.post('/AddExpence',ExpenceCtrl.AddExpence);
router.put('/ChangeDetailsOfExpenceById/:id',ExpenceCtrl.ChangeDetailsOfExpenceById);
router.delete('/RemoveExpenceById/:id',ExpenceCtrl.RemoveExpenceById);

router.get('/getAllMembers',MemberCtrl.getAll);
router.get('/getMember/:id',MemberCtrl.getById);
router.post('/AddMember',MemberCtrl.AddMember);
router.put('/ChangeDetailsOfMemberById/:id',MemberCtrl.ChangeDetailsOfMemberById);
router.delete('/RemoveMemberById/:id',MemberCtrl.RemoveMemberById);

router.get('/getAllInstallments',InstallmentCtrl.getAll);
router.get('/getInstallment/:id',InstallmentCtrl.getById);
router.post('/AddInstallment',InstallmentCtrl.AddInstallment);
router.put('/ChangeDetailsOfInstallmentById/:id',InstallmentCtrl.ChangeDetailsOfInstallmentById);
router.delete('/RemoveInstallmentById/:id',InstallmentCtrl.RemoveInstallmentById);


router.get('/getAllHistorys',HistoryCtrl.getAll);
router.get('/getHistory/:id',HistoryCtrl.getById);
router.post('/AddHistory',HistoryCtrl.AddHistory);
router.put('/ChangeDetailsOfHistoryById/:id',HistoryCtrl.ChangeDetailsOfHistoryById);
router.delete('/RemoveHistoryById/:id',HistoryCtrl.RemoveHistoryById);






module.exports = router;