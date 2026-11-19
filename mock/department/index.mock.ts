import { toAnyString } from '@/utils'
import { faker } from '@faker-js/faker'
import { SUCCESS_CODE } from '@/constants'

const departmentList: any = []

const citys = ['厦门总公司', '北京分公司', '上海分公司', '福州分公司', '深圳分公司', '杭州分公司']

for (let i = 0; i < 5; i++) {
  departmentList.push({
    // Department name
    departmentName: citys[i],
    id: toAnyString(),
    createTime: faker.date.anytime(),
    status: faker.number.int({ min: 0, max: 1 }),
    // Remark
    remark: faker.lorem.sentence(),
    children: [
      {
        // Department name
        departmentName: '研发部',
        createTime: faker.date.anytime(),
        // Status
        status: faker.number.int({ min: 0, max: 1 }),
        id: toAnyString(),
        remark: faker.lorem.sentence()
      },
      {
        // Department name
        departmentName: '产品部',
        createTime: faker.date.anytime(),
        // Status
        status: faker.number.int({ min: 0, max: 1 }),
        id: toAnyString(),
        remark: faker.lorem.sentence()
      },
      {
        // Department name
        departmentName: '运营部',
        createTime: faker.date.anytime(),
        // Status
        status: faker.number.int({ min: 0, max: 1 }),
        id: toAnyString(),
        remark: faker.lorem.sentence()
      },
      {
        // Department name
        departmentName: '市场部',
        createTime: faker.date.anytime(),
        // Status
        status: faker.number.int({ min: 0, max: 1 }),
        id: toAnyString(),
        remark: faker.lorem.sentence()
      },
      {
        // Department name
        departmentName: '销售部',
        createTime: faker.date.anytime(),
        // Status
        status: faker.number.int({ min: 0, max: 1 }),
        id: toAnyString(),
        remark: faker.lorem.sentence()
      },
      {
        // Department name
        departmentName: '客服部',
        createTime: faker.date.anytime(),
        // Status
        status: faker.number.int({ min: 0, max: 1 }),
        id: toAnyString(),
        remark: faker.lorem.sentence()
      }
    ]
  })
}

export default [
  // List API
  {
    url: '/mock/department/list',
    method: 'get',
    response: () => {
      return {
        code: SUCCESS_CODE,
        data: {
          list: departmentList
        }
      }
    }
  },
  {
    url: '/mock/department/table/list',
    method: 'get',
    response: () => {
      return {
        code: SUCCESS_CODE,
        data: {
          list: departmentList,
          total: 5
        }
      }
    }
  },
  {
    url: '/mock/department/users',
    method: 'get',
    timeout: 1000,
    response: ({ query }) => {
      const { pageSize } = query
      // Create data based on pageSize
      const mockList: any = []
      for (let i = 0; i < pageSize; i++) {
        mockList.push({
          // Username
          username: faker.person.firstName(),
          // Account
          account: faker.person.lastName(),
          // Email
          email: faker.internet.email(),
          // Create time
          createTime: faker.date.anytime(),
          // User ID
          id: toAnyString()
        })
      }
      return {
        code: SUCCESS_CODE,
        data: {
          total: 100,
          list: mockList
        }
      }
    }
  },
  // Save API
  {
    url: '/mock/department/user/save',
    method: 'post',
    timeout: 1000,
    response: () => {
      return {
        code: SUCCESS_CODE,
        data: 'success'
      }
    }
  },
  // Delete API
  {
    url: '/mock/department/user/delete',
    method: 'post',
    response: ({ body }) => {
      const ids = body.ids
      if (!ids) {
        return {
          code: 500,
          message: '请选择需要删除的数据'
        }
      } else {
        return {
          code: SUCCESS_CODE,
          data: 'success'
        }
      }
    }
  },
  // Save API
  {
    url: '/mock/department/save',
    method: 'post',
    timeout: 1000,
    response: () => {
      return {
        code: SUCCESS_CODE,
        data: 'success'
      }
    }
  },
  // Delete API
  {
    url: '/mock/department/delete',
    method: 'post',
    response: ({ body }) => {
      const ids = body.ids
      if (!ids) {
        return {
          code: 500,
          message: '请选择需要删除的数据'
        }
      } else {
        return {
          code: SUCCESS_CODE,
          data: 'success'
        }
      }
    }
  }
]
