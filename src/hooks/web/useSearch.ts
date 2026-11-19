import { ref, unref, nextTick } from 'vue'
import { FormSchema, FormSetProps } from '@/components/Form'
import { SearchExpose, SearchProps } from '@/components/Search'

export const useSearch = () => {
  // Search instance
  const searchRef = ref<SearchExpose>()

  /**
   * @param ref Search instance
   * @param elRef ElForm instance
   */
  const register = (ref: SearchExpose) => {
    searchRef.value = ref
  }

  const getSearch = async () => {
    await nextTick()
    const search = unref(searchRef)
    if (!search) {
      console.error('The Search is not registered. Please use the register method to register')
    }
    return search
  }

  // Some built-in methods
  const methods = {
    /**
     * @description Set the props of the Search component
     * @param field The field of the FormItem
     */
    setProps: async (props: SearchProps = {}) => {
      const search = await getSearch()
      search?.setProps(props)
      if (props.model) {
        search?.setValues(props.model)
      }
    },

    /**
     * @description Set the form values
     * @param data The data to set
     */
    setValues: async (data: Recordable) => {
      const search = await getSearch()
      search?.setValues(data)
    },

    /**
     * @description Set the schema
     * @param schemaProps The schemaProps to set
     */
    setSchema: async (schemaProps: FormSetProps[]) => {
      const search = await getSearch()
      search?.setSchema(schemaProps)
    },

    /**
     * @description Add a schema
     * @param formSchema The data to add
     * @param index Where to add it
     */
    addSchema: async (formSchema: FormSchema, index?: number) => {
      const search = await getSearch()
      search?.addSchema(formSchema, index)
    },

    /**
     * @description Delete a schema
     * @param field Which data to delete
     */
    delSchema: async (field: string) => {
      const search = await getSearch()
      search?.delSchema(field)
    },

    /**
     * @description Get the form data
     * @returns form data
     */
    getFormData: async <T = Recordable>(): Promise<T> => {
      const search = await getSearch()
      return search?.formModel as T
    }
  }

  return {
    searchRegister: register,
    searchMethods: methods
  }
}
