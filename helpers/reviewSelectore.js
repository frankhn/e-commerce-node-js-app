import select from 'lodash';

/**
 * Picker from array
 */
class ReviewSelector {
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
    const user = select.pick(this.order, ['id', 'customer_id', 'product_id', 'review', 'rating']);
    return user;
  }
}

export default ReviewSelector;
