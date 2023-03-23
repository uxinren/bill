import { faker } from "@faker-js/faker"

export const mockItemSummary: Mock = (config) => {
  const { group_by, kind } = config.params
  if (group_by === 'happen_at' && kind === 'expenses') {
    return [
      200,
      {
        groups: [
          { happen_at: '2023-03-12T00:00:00.000+0800', amount: 100 },
          { happen_at: '2023-03-16T00:00:00.000+0800', amount: 300 },
          { happen_at: '2023-03-22T00:00:00.000+0800', amount: 500 }
        ],
        summary: 600
      }
    ]
  }else if(group_by === 'happen_at' && kind === 'income'){
    return [
      200,
      {
        groups: [
          { happen_at: '2023-03-08T00:00:00.000+0800', amount: 1000 },
          { happen_at: '2023-03-12T00:00:00.000+0800', amount: 600 },
          { happen_at: '2023-03-19T00:00:00.000+0800', amount: 200 }
        ],
        summary: 600
      }
    ]
  }else if (group_by === 'tag_id' && kind === 'expenses') {
    return [
      200,
      {
        groups: [
          { tag_id: 1, tag: { id: 1, name: '交通', sign: faker.internet.emoji() }, amount: 100 },
          { tag_id: 2, tag: { id: 2, name: '吃饭', sign: faker.internet.emoji() }, amount: 300 },
          { tag_id: 3, tag: { id: 3, name: '购物', sign: faker.internet.emoji() }, amount: 200 }
        ],
        summary: 600
      }
    ]
  }else {
    return [
      200,
      {
        groups: [
          { tag_id: 1, tag: { id: 1, name: '交通', sign: faker.internet.emoji() }, amount: 600 },
          { tag_id: 2, tag: { id: 2, name: '吃饭', sign: faker.internet.emoji() }, amount: 300 },
          { tag_id: 3, tag: { id: 3, name: '购物', sign: faker.internet.emoji() }, amount: 100 }
        ],
        summary: 1000
      }
    ]
  }
}