module.exports = function(app,db){
    app.post('/notes',(req,res)=>{
        const body = req.body;
        const note = {text:body.body,title:body.title};
        db.collection('notes').insert(note,(error,result) => {
            if(error)res.send({'error':'An error has occurred'});
            else res.send(result.ops[0]);
        });
    });
};