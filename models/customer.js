const CustomerModel = (sequelize, DataTypes) => {
  const Customer = sequelize.define('customer', {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        is: ['^[a-z]+$', 'i'],
        notEmpty: true,
      }
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
        validation() {
          if (!this.provider) {
            if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(this.email)) {
              throw new Error('email is invalid');
            }
          }
        }
      }
    },
    password: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: true,
      }
    },
    credit_card: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        isCreditCard: true,
      }
    },
    address_1: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    address_2: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    region: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    postal_code: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: {
        isNumeric: true,
      }
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: {
        notEmpty: true,
      }
    },
    shipping_region_id: {
      type: DataTypes.INTEGER,
      defaultValues: 1,
    },
    day_phone: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: {
        isNumeric: true,
      }
    },
    eve_phone: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: {
        isNumeric: true,
      }
    },
    mob_phone: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: {
        isNumeric: true,
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  Customer.associate = (models) => {
    // associations can be defined here
  };

  // Customer.find = email => Customer.findOne({ where: email });
  // Customer.create = (userProfile) => {
  //   Customer.create({ defaultValues: userProfile });
  // };
  // Customer.login = (email, password) => Customer.findOne({ where: email, password });

  return Customer;
};

export default CustomerModel;
