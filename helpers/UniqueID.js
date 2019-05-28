
/**
 * unique id
 */
class UniqueId {
  /**
   * @author frank harerimana
   */
  constructor() {
    this.today = Date.now();
    this.randomNumber = Math.floor(Math.random() * 10000);
    // this.randomString = Math.random().toString(36).slice(2);
  }

  /**
     * @author frank harerimana
     * @param { String } name
     * @returns { String } username
     */
  uniqueId() {
    return `${this.randomNumber}`;
  }
}

export default UniqueId;
