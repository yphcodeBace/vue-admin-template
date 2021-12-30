// 销售
const salesRouter = [
  {
    name: '订单管理',
    children: [
      { name: '订单管理1', path: 'order1' },
      { name: '订单管理2', path: 'order2' }
    ]
  },
  {
    name: '备货管理',
    children: [
      { name: '备货管理1', path: 'stock1' },
      { name: '备货管理2', path: 'stock2' }
    ]
  }
]
export { salesRouter }
