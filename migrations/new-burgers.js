module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('burgers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            burger_name: {
                type: Sequelize.STRING
            },
            devoured: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            burger_date: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date()
            }
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('burgers');
    }
};