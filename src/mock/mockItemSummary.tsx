export const mockItemSummary: Mock = config => {
    return [200, {
      "groups": [
        { "happen_at": "2023-03-10T00:00:00.000+0800", "amount": 100 },
        { "happen_at": "2023-03-15T00:00:00.000+0800", "amount": 300 },
        { "happen_at": "2023-03-22T00:00:00.000+0800", "amount": 200 }
      ],
      "summary": 600
    }]
  }