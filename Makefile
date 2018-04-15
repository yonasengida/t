Host: 159.65.228.222
scp username@b:/path/to/file /path/to/destination
scp /path/to/file username@a:/path/to/destination


DB.update({key: "Contacts", "value.name": "KFC" },
         { $set: { "value.$.phone" : 666 } },function(err,doc){

         });

https://docs.mongodb.com/manual/reference/operator/update/positional/#up._S_



db.classes.findAndModify({
    query: { Code: "CS321", Students: { $elemMatch: { Name: "Bob" } } },
    update: { $set: { "Students.$.Grade": NumberInt(89) } }
})

https://www.mattburkedev.com/updating-inside-a-nested-array-with-the-mongodb-positional-operator-in-c-number/


