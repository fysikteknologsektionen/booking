// Repository constructor is private, so we only have to mock builder method
const mock = {
  makeRepository: () => ({
    list: jest.fn().mockReturnValue(Promise.resolve([])),
    get: jest.fn().mockReturnValue(Promise.resolve({})),
    create: jest.fn().mockReturnValue(Promise.resolve({})),
    update: jest.fn().mockReturnValue(Promise.resolve({})),
    delete: jest.fn(),
  }),
};

export default mock;
