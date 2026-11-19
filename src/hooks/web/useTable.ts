import { useI18n } from '@/hooks/web/useI18n'
import { Table, TableExpose, TableProps, TableSetProps, TableColumn } from '@/components/Table'
import { ElTable, ElMessageBox, ElMessage } from 'element-plus'
import { ref, watch, unref, nextTick, onMounted } from 'vue'

const { t } = useI18n()

interface UseTableConfig {
  /**
   * Whether to fetch once on initialization
   */
  immediate?: boolean
  fetchDataApi: () => Promise<{
    list: any[]
    total?: number
    flag?: boolean // Custom flag for asset queries, which set total on their own instead of here
  }>
  fetchDelApi?: () => Promise<boolean>
}

export const useTable = (config: UseTableConfig) => {
  const { immediate = true } = config

  const loading = ref(false)
  const currentPage = ref(1)
  const pageSize = ref(20)
  const total = ref(0)
  const dataList = ref<any[]>([])

  watch(
    () => currentPage.value,
    () => {
      methods.getList()
    }
  )

  watch(
    () => pageSize.value,
    () => {
      // Changing the page size while not on page 1 would trigger getList more than once
      if (unref(currentPage) === 1) {
        methods.getList()
      } else {
        currentPage.value = 1
        methods.getList()
      }
    }
  )

  onMounted(() => {
    if (immediate) {
      methods.getList()
    }
  })

  // Table instance
  const tableRef = ref<typeof Table & TableExpose>()

  // ElTable instance
  const elTableRef = ref<ComponentRef<typeof ElTable>>()

  const register = (ref: typeof Table & TableExpose, elRef: ComponentRef<typeof ElTable>) => {
    tableRef.value = ref
    elTableRef.value = unref(elRef)
  }

  const getTable = async () => {
    await nextTick()
    const table = unref(tableRef)
    if (!table) {
      console.error('The table is not registered. Please use the register method to register')
    }
    return table
  }

  const methods = {
    /**
     * Fetch the list data
     */
    getList: async () => {
      loading.value = true
      try {
        const res = await config?.fetchDataApi()
        console.log('fetchDataApi res', res)
        if (res) {
          dataList.value = res.list
          if (!res.flag) {
            total.value = res.total || 0
          }
        }
      } catch (err) {
        console.log('fetchDataApi error')
      } finally {
        loading.value = false
      }
    },

    /**
     * @description Set the props of the table component
     * @param props the props for the table component
     */
    setProps: async (props: TableProps = {}) => {
      const table = await getTable()
      table?.setProps(props)
    },

    /**
     * @description Set columns
     * @param columnProps the columns to set
     */
    setColumn: async (columnProps: TableSetProps[]) => {
      const table = await getTable()
      table?.setColumn(columnProps)
    },

    /**
     * @description Add a column
     * @param tableColumn the column to add
     * @param index where to add it
     */
    addColumn: async (tableColumn: TableColumn, index?: number) => {
      const table = await getTable()
      table?.addColumn(tableColumn, index)
    },

    /**
     * @description Delete a column
     * @param field which column to delete
     */
    delColumn: async (field: string) => {
      const table = await getTable()
      table?.delColumn(field)
    },

    /**
     * @description Get the ElTable component instance
     * @returns ElTable instance
     */
    getElTableExpose: async () => {
      await getTable()
      return unref(elTableRef)
    },

    refresh: () => {
      methods.getList()
    },

    // sortableChange: (e: any) => {
    //   console.log('sortableChange', e)
    //   const { oldIndex, newIndex } = e
    //   dataList.value.splice(newIndex, 0, dataList.value.splice(oldIndex, 1)[0])
    //   // to do something
    // }
    // Delete data
    delList: async (idsLength: number) => {
      const { fetchDelApi } = config
      if (!fetchDelApi) {
        console.warn('fetchDelApi is undefined')
        return
      }
      ElMessageBox.confirm(t('common.delMessage'), t('common.delWarning'), {
        confirmButtonText: t('common.delOk'),
        cancelButtonText: t('common.delCancel'),
        type: 'warning'
      }).then(async () => {
        const res = await fetchDelApi()
        if (res) {
          ElMessage.success(t('common.delSuccess'))

          // Compute the last valid page after deletion
          const current =
            unref(total) % unref(pageSize) === idsLength || unref(pageSize) === 1
              ? unref(currentPage) > 1
                ? unref(currentPage) - 1
                : unref(currentPage)
              : unref(currentPage)

          currentPage.value = current
          methods.getList()
        }
      })
    }
  }

  return {
    tableRegister: register,
    tableMethods: methods,
    tableState: {
      currentPage,
      pageSize,
      total,
      dataList,
      loading
    }
  }
}
