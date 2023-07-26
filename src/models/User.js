const fs = require ('fs');

//crear usuario y se guarda en archivo json
const User ={
    fileName: 'src/data/user.json',
    getData: function (){
        return JSON.parse (fs.readFileSync(this.fileName, 'utf-8'));
    },

    generateId: function (){
        let allUser = this.findAll();
        let lastUser = allUser.pop();
        if (lastUser){
            return lastUser.id + 1;
        }
        return 1;
    },
   //buscar usuario
    findAll : function (){
        return this.getData();
    },
    //buscar usuario,primer parametro columna ( name, email,etc) segundo param dato que tenga 
    findByField: function (field, email){
        let allUsers = this.findAll(); 
        let userFound = allUsers.find(oneUser => oneUser[field] === email);
        return userFound;
    },
    //buscar usuario por id
    findByPk: function(id){
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id === id);
        return userFound;
    },
    //metodo para guardar usuario en DB
    create:function(userData){
        let allUsers = this.findAll(); 
        let newUser ={
            id: this.generateId(),
            ...userData
        }
        allUsers.push(newUser);
        fs.writeFileSync (this.fileName, JSON.stringify(allUsers, null, ' ' ));
        return newUser;
    },

    delete : function (id){
        let allUsers = this.findAll ();
        let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
        fs.writeFileSync (this.fileName, JSON.stringify(finalUsers, null, ' ' ));
        return true;
    }
}
module.exports = User;

