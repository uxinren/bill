import { faker } from '@faker-js/faker'
let id = 0;
const createId = () => {
  id += 1;
  return id;
};
export const mockTagEdit: Mock = config => {
  const createTag = (attrs?: any) =>
    ({
      id: createId(),
      name: faker.lorem.word(),
      sign: faker.internet.emoji(),
      kind: 'expenses',
      ...attrs
    })
  return [200, {resource: createTag()}]
}