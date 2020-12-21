module.exports = (sequelize,DataTypes) =>{
    const Comments = sequelize.define('Comments',{
        commentid:{
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'commentid'
        },
        text:{
            type:DataTypes.STRING(500),
            allowNull: false,
            primaryKey: false,
            autoIncrement: false,
            field: 'text'
        },
        upload_file:{
            type:DataTypes.STRING,
        } ,
        upload_dir: {
            type:DataTypes.STRING
        }


    })
    return Comments
}