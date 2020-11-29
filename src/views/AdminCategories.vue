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
            @click.stop.prevent="deleteCategory(category.id)"
            type="button"
          )  Delete
</template>

<script>
import AdminNav from '@/components/AdminNav'
// import { v4 as uuid } from 'uuid'
const dummyData = {
  categories: [
    {
      id: 1,
      name: '中式料理',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z'
    },
    {
      id: 2,
      name: '日本料理',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z'
    },
    {
      id: 3,
      name: '義大利料理',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z'
    },
    {
      id: 4,
      name: '墨西哥料理',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z'
    }
  ]
}

export default {
  components: {
    AdminNav
  },
  data () {
    return {
      targetId: undefined,
      newCategoryName: '',
      categories: []
    }
  },
  created () {
    this.fetchCategories()
  },
  methods: {
    fetchCategories () {
      this.categories = dummyData.categories.map(e => ({
        ...e,
        nameCached: '',
        isEditing: false
      }))
    },
    createCategory () {
      if (this.newCategoryName.length === 0) return
      let newId
      if (this.categories.length === 0) {
        newId = 1
      } else {
        newId = +this.categories.map(e => e.id).sort((a, b) => b - a)[0] + 1
      }
      // TODO: Call API to create new category
      this.categories.push({
        name: this.newCategoryName,
        id: newId,
        isEditing: false,
        nameCached: '',
        createdAt: new Date(),
        updatedAt: new Date()
      })
      this.newCategoryName = ''
    },
    deleteCategory (id) {
      this.categories = this.categories.filter(e => e.id !== id)
    },
    toggleIsEditing (categoryId) {
      const target = this.categories.find(e => e.id === categoryId)
      target.isEditing = !target.isEditing
      target.nameCached = target.name
    },
    updateCategory (categoryId, name) {
      const updateObj = {
        id: categoryId,
        name
      }
      console.log(updateObj)
      // TODO: call API to update category
      this.toggleIsEditing(categoryId)
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
