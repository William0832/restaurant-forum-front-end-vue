<template lang="pug">
.container.py-5
  AdminNav
  form.my-4
    .form-row
      .col-auto
        input.form-control(
          v-model.trim='newCategoryName'
          type="text"
          placeholder="新增餐廳類別..."
        )
      .col-auto
        button.btn.btn-primary(
          :disabled ="isProcessing"
          type="button"
          @click.stop.prevent="createCategory"
        ) 新增
  table.table
    thead.thead-dark
      tr
        th(scope="col", width="60") #
        th(scope="col") Category Name
        th(scope="col", width="210") Action
    tbody
      tr(v-for="category in categories", :key="category.id")
        th(scope="row") {{ category.id }}
        td.position-relative
          .category-name(
            v-show="!category.isEditing"
            ) {{ category.name }}
          input.form-control(
            v-show="category.isEditing"
            v-model="category.name"
            type="text"
          )
          span.cancel(
            v-show="category.isEditing"
            @click.stop.prevent="cancelEditing(category.id)"
          ) ✕
        td.d-flex.justify-content-between
          button.btn.btn-link.mr-2(
            v-show="!category.isEditing"
            @click.stop.prevent="toggleIsEditing(category.id)"
            type="button"
          ) Edit
          button.btn.btn-link.mr-2(
            v-show="category.isEditing"
            @click.stop.prevent="updateCategory(category.id, category.name)"
            type="button"
          ) Save
          button.btn.btn-link.mr-2(
            :disabled="isProcessing"
            @click.stop.prevent="deleteCategory(category.id)"
            type="button"
          )  Delete
</template>

<script>
import AdminNav from '@/components/AdminNav'
import adminAPI from '../apis/admin'
import { Toast } from '../utils/helpers'
export default {
  components: {
    AdminNav
  },
  data () {
    return {
      isProcessing: false,
      targetId: undefined,
      newCategoryName: '',
      categories: []
    }
  },
  created () {
    this.fetchCategories()
  },
  methods: {
    async fetchCategories () {
      try {
        const { data } = await adminAPI.categories.get()
        this.categories = data.categories.map(e => ({
          ...e,
          nameCached: '',
          isEditing: false
        }))
      } catch (err) {
        console.error(err)
        Toast.fire({
          icon: 'error',
          title: '無法取得類別資料，請稍後再試'
        })
      }
    },
    async createCategory () {
      try {
        if (!this.newCategoryName) {
          Toast.fire({
            icon: 'warning',
            title: '請輸入類別名稱'
          })
          return
        }
        if (this.categories.map(e => e.name).includes(this.newCategoryName)) {
          Toast.fire({
            icon: 'warning',
            title: '類別名稱重複，請再確認'
          })
          return
        }
        this.isProcessing = true
        const name = this.newCategoryName
        const { data } = await adminAPI.categories.create(name)
        if (data.status !== 'success') throw new Error(data.message)
        const { categoryId } = data
        this.categories.push({
          name: this.newCategoryName,
          id: categoryId,
          isEditing: false,
          nameCached: ''
        })
        this.newCategoryName = ''
        this.isProcessing = false
      } catch (err) {
        this.isProcessing = false
        console.error(err)
        Toast.fire({
          icon: 'error',
          title: err || '無法新增類別，請稍後再試'
        })
      }
    },
    async deleteCategory (categoryId) {
      try {
        this.isProcessing = true
        const { data } = await adminAPI.categories.delete(categoryId)
        if (data.status !== 'success') throw new Error(data.message)
        this.categories = this.categories.filter(e => e.id !== categoryId)
        this.isProcessing = false
      } catch (err) {
        this.isProcessing = false
        console.error(err)
        Toast.fire({
          icon: 'error',
          title: err || '無法刪除類別，請稍後再試'
        })
      }
    },
    toggleIsEditing (categoryId) {
      const target = this.categories.find(e => e.id === categoryId)
      target.isEditing = !target.isEditing
      target.nameCached = target.name
    },
    async updateCategory (categoryId, name) {
      try {
        const { data } = await adminAPI.categories.update(categoryId, name)
        if (data.status !== 'success') throw new Error(data.message)
        this.toggleIsEditing(categoryId)
      } catch (err) {
        console.error(err)
        Toast.fire({
          icon: 'error',
          title: err || '無法更新類別，請稍後再試'
        })
      }
    },
    cancelEditing (categoryId) {
      const target = this.categories.find(e => e.id === categoryId)
      target.name = target.nameCached
      target.isEditing = false
    }
  }
}
</script>

<style lang="sass" scoped>
.category-name
  padding: 0.375rem 0.75rem
  border: 1px solid transparent
  outline: 0
  cursor: auto
.btn-link
  width: 62px
.cancel
  position: absolute
  right: 20px
  top: 50%
  transform: translateY(-50%)
  display: inline-flex
  align-items: center
  justify-content: center
  width: 25px
  height: 25px
  border: 1px solid #aaaaaa
  border-radius: 50%
  user-select: none
  cursor: pointer
  font-size: 12px
</style>
