export const mockItemSummary: Mock = config => {
    return [200, {
      "groups": [
        { "happen_at": "2018-06-18T00:00:00.000+0800", "amount": 100 },
        { "happen_at": "2018-06-22T00:00:00.000+0800", "amount": 300 },
        { "happen_at": "2018-06-29T00:00:00.000+0800", "amount": 200 }
      ],
      "summary": 600
    }]
  }