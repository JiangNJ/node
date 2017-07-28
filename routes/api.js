var express = require('express');
var router = express.Router();

/*
1. 获取所有的note ：GET ／api/notes  req:{}  成功：res:{stauts: 0, data:[{},{}]}  失败： res:{stauts:1, errormsg:失败的原因} 
2. 创建一个 note ： POST： ／apiadd   req: {note: 'hellow world}
3. 修改一个 note ： POST： /api/edit  {note: 'new note', id: 100}
4. 删除一个note : POST: /api/delete {id: 100}
*/
/* GET users listing. */
router.get('/notes', function(req, res, next) {
  console.log('/notes')
});

router.post('/add',function(req,res,next) {
  var note = req.body.note;
  console.log('addd', note)
});

router.post('/edit',function(req,res,next) {
  
});

router.post('/delete',function(req,res,next) {
  
});



module.exports = router;
