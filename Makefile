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

'use strict';

const data = [{
	Group: 'A',
	Name: 'SD'
}, {
	Group: 'B',
	Name: 'FI'
}, {
	Group: 'A',
	Name: 'MM'
}, {
	Group: 'B',
	Name: 'CO'
}];

let unique = [...new Set(data.map(item => item.Group))];
console.log(unique);
//console.log(...new Set(data.map(item => item.Group)));
