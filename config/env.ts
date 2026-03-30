export const ENV = {
  get BASE_URL() {
    return process.env.BASE_URL || 'https://www.saucedemo.com';
  },
  get USERNAME() {
    return process.env.TEST_USERNAME || 'standard_user';
  },
  get PASSWORD() {
    return process.env.TEST_PASSWORD || 'secret_sauce';
  },
  get ADMIN_USERNAME() {
    return process.env.ADMIN_USERNAME || 'admin_user';
  },
  get ADMIN_PASSWORD() {
    return process.env.ADMIN_PASSWORD || 'secret_admin_sauce';
  }
};
