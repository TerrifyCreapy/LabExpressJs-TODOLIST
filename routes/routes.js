const Router = require('express');
const router = Router();
const db = require('../db');

router.get('/', async (req, res) => {
   try{
      const todos = await db.query("SELECT * FROM todo ORDER BY completed");
      debugger;
      res.render('index' , {
         title: "Todos",
         isIndex: true,
         todos : todos.rows,
      });
   }
   catch(err) {
       console.error(err.message);
   }

});

router.get('/create', async (req, res) => {
   res.render('create', {
      title: "Create todo",
      isCreate: true,
   });
});

router.post('/create', async (req, res) => {
   if(req.body.title.length) {
      const todo = await db.query("INSERT INTO todo(description, completed) VALUES($1,$2)",[req.body.title,false]);
      res.redirect('/');
   }
});

router.post('/complete', async(req,res) => {
   let inputValue = req.body.vote;
   if(inputValue === "save") {
      const todoItem = await db.query("SELECT completed FROM todo WHERE todo_id=$1",[req.body.id]);
      const todoUpdate = await db.query("UPDATE todo SET completed=$1 WHERE todo_id=$2",[!todoItem.rows[0].completed,req.body.id]);
   }
   else {
      const deleteItem = await db.query("DELETE FROM todo WHERE todo_id=$1",[req.body.id]);
   }

   res.redirect('/');
})

module.exports = router;