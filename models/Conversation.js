import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Conversation = sequelize.define('Conversation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  created: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'conversations',
  timestamps: false,
});

User.hasMany(Conversation, { foreignKey: 'userId', onDelete: 'CASCADE' });
Conversation.belongsTo(User, { foreignKey: 'userId' });

export default Conversation;