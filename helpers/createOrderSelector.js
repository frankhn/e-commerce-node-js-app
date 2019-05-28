import select from 'lodash';

/**
 * Picker from array
 */
class CreateOrderSelector {
  /**
     * @author frank
     * @param  {...any} object
     */
  constructor(object) {
    this.order = object;
  }

  /**
   * select data
   * @returns {*} user
   */
  select() {
    const user = select.pick(this.order, ['id', 'customer_id', 'total_amount', 'shipped_on', 'status', 'comments']);
    return user;
  }
}

export default CreateOrderSelector;
