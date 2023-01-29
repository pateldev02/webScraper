module.exports = (sequelize , DataTypes) => {


    const Data = sequelize.define("data",{
        id:{                                                            // two parameters first is table name
            type: DataTypes.INTEGER,                                    // and second is Obj.
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        Price:{
            type: DataTypes.STRING,
            allowNull: false
        },
        Engine:{
            type: DataTypes.STRING,
            allowNull: false
        },
        Emission_Type:{
            type: DataTypes.STRING,
            allowNull: false
        },
        Max_Power:{
            type: DataTypes.STRING,
            allowNull: false
        },
        ABS:{
            type: DataTypes.STRING,
            allowNull: false
        }


        },{
            timestamps:false
        },
    )
    return Data
}