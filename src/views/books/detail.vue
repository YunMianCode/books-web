<template>
  <div class="app-container">

    <el-form :model="form" ref="form" label-width="100px" v-loading="formLoading" :rules="rules">
      <el-form-item label="图书名："  prop="name" required>
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="出版社："  required>
        <el-input v-model="form.brand"></el-input>
      </el-form-item>
      <el-form-item label="类别：" prop="cat" >
        <el-input v-model="form.cat"></el-input>
      </el-form-item>
      <el-form-item label="详细类别：" prop="detailCat">
        <el-input v-model="form.detailCat"></el-input>
      </el-form-item>
      <el-form-item label="价格：" prop="price">
<!--        <el-select v-model="form.sex" placeholder="性别" clearable>-->
<!--          <el-option v-for="item in sexEnum" :key="item.key" :value="item.key" :label="item.value"></el-option>-->
<!--        </el-select>-->
        <el-input v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="更新时间：" prop="lastCrawlTime">
        <el-date-picker v-model="form.lastCrawlTime" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" />
      </el-form-item>
      <el-form-item label="链接：" prop="url">
        <el-input v-model="form.url"></el-input>
      </el-form-item>
      <el-form-item label="状态：" required>
        <el-select v-model="form.status" placeholder="状态">
          <el-option v-for="item in statusEnum" :key="item.key" :value="item.key" :label="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import bookApi from '@/api/book'

export default {
  data () {
    return {
      form: {
        id: null,
        name: '',
        brand: '',
        cat: '',
        role: 1,
        status: 1,
        age: '',
        sex: '',
        birthDay: null,
        phone: null,
        userLevel: null
      },
      formLoading: false,
      rules: {
        name: [
          { required: true, message: '请输入图书名', trigger: 'blur' }
        ],
        cat: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' }
        ],
        userLevel: [
          { required: true, message: '请选择年级', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    let id = this.$route.query.id
    let _this = this
    if (id && parseInt(id) !== 0) {
      _this.formLoading = true
      bookApi.selectBook(id).then(re => {
        _this.form = re.response
        _this.formLoading = false
      })
    }
  },
  methods: {
    submitForm () {
      let _this = this
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.formLoading = true
          bookApi.createBook(this.form).then(data => {
            if (data.code === 1) {
              _this.$message.success(data.message)
              _this.delCurrentView(_this).then(() => {
                _this.$router.push('/books/list')
              })
            } else {
              _this.$message.error(data.message)
              _this.formLoading = false
            }
          }).catch(e => {
            _this.formLoading = false
          })
        } else {
          return false
        }
      })
    },
    resetForm () {
      let _this = this
      _this.$router.push('/books/list')
    },
    ...mapActions('tagsView', { delCurrentView: 'delCurrentView' })
  },
  computed: {
    ...mapGetters('enumItem', [
      'enumFormat'
    ]),
    ...mapState('enumItem', {
      sexEnum: state => state.user.sexEnum,
      roleEnum: state => state.user.roleEnum,
      statusEnum: state => state.user.statusEnum,
      levelEnum: state => state.user.levelEnum
    })
  }
}
</script>
