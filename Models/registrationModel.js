module.exports = (sequelize , DataTypes) => {


    const Registration = sequelize.define("registration",{
        id:{                                                            // two parameters first is table name
            type: DataTypes.INTEGER,                                    // and second is Obj.
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false
        },
        gender:{
            type: DataTypes.STRING,
            allowNull: false
        },
        mobile_no:{
            type: DataTypes.STRING,
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        }


        },{
            timestamps:false
        },
    )
    return Registration
}