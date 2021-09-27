<template>
  <div class="row">
    <div class="col-md-6 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <h2>设置 <small></small></h2>
          <div class="clearfix"></div>
        </div>
        <div class="x_content">
          <br />
          <button type="submit" class="btn btn-success" v-if="showInitBtn" @click="initConfig">初始化配置</button>
          <form class="form-horizontal form-label-left" v-else>
            <div class="form-group" v-for="( config, index ) in configs" :key="index">
              <label class="control-label col-md-3 col-sm-3 col-xs-12">{{ config.mdmDesc }}</label>
              <div class="col-md-3 col-sm-3 col-xs-6">
                <div class="" v-if="config.type == 2">
                  <label>
                    <el-checkbox v-model="config.mdmValue" true-label="1" false-label="0" checked>
                      {{ config.mdmValue == 1 ? "停用":"启用"}}
                    </el-checkbox>
                  </label>
                </div>
                <el-date-picker v-else-if="config.type == 3" v-model="config.mdmValue" type="date" placeholder="选择日期"></el-date-picker>
                <input type="text" v-else class="form-control" v-model="config.mdmValue" oninput="value=value.replace(/[^\d]/g, '')">
              </div>
            </div>
            <div class="ln_solid"></div>
            <div class="form-group">
              <div class="col-md-3 col-sm-3 col-xs-6 col-md-offset-3">
                <button type="button" class="btn btn-primary" @click="cancel">取消</button>
                <button type="submit" class="btn btn-success" @click="save">确定</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Post, Get } from '@/api/HttpClient'
import { ElMessage } from 'element-plus'
import moment from 'moment'

export default {
  name: 'SettingForm',
  data: function () {
    return {
      configs: [
      ],
      originConfigs: [
      ],
      showInitBtn: false
    }
  },
  mounted () {
    this.getConfig()
  },
  methods: {
    getConfig () {
      const that = this
      Get('http://localhost:8001/mdm/list', {},
        function (response) {
          const data = response.data
          if (data.success) {
            that.configs = data.data
            if (that.configs.length === 0) {
              that.showInitBtn = true
              return
            }
            for (let i = 0; i < that.configs.length; i++) {
              if (that.configs[i].type === 3) { // 时间
                that.configs[i].mdmValue = moment(that.configs[i].mdmValue).format('YYYY-MM-DD')
              }
            }
            that.originConfigs = JSON.parse(JSON.stringify(that.configs))
            return
          }
          console.error('接口异常')
        })
    },
    save () {
      const configList = this.configs
      for (let i = 0; i < configList.length; i++) {
        const config = configList[i]
        if (config.type === 3) {
          config.mdmValue = moment(config.mdmValue).valueOf()
        }
      }
      Post('http://localhost:8001/mdm/save', configList,
        function (response) {
          const data = response.data
          if (data.success) {
            ElMessage({
              showClose: true,
              message: '保存成功',
              type: 'success'
            })
          }
        })
    },
    cancel () {
      console.log('1234')
      this.configs = JSON.parse(JSON.stringify(this.originConfigs))
    },
    numValid (val) {
      console.log(val)
      val = val.replace(/[^0-9]/g, '')
      console.log((val))
    },
    initConfig () {
      const that = this
      Get('http://localhost:8001/mdm/initConfig/false', {
      }, function (response) {
        if (response.data.success) {
          ElMessage({
            showClose: true,
            message: '初始化成功',
            type: 'success'
          })
          that.showInitBtn = false
          that.getConfig()
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
