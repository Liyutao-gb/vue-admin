import request from '@/utils/request'    //axios

export default {
    //1、分页查询banner
    getPageBanner(current,limit) {
        return request({
            url: `/educms/banneradmin/pageBanner/${current}/${limit}`,
            method: 'get'
          })
    },
    //2、根据id查找banner
    getBannerInfo(id) {
        return request({
            url: `/educms/banneradmin/get/${id}`,
            method: 'get'
          })
    },
    //3、添加banner
    addBanner(CrmBanner) {
        return request({
            url: `/educms/banneradmin/addBanner`,
            method: 'post',
            data:CrmBanner
          })
    },
    //4、修改Banner
    updateBannerInfo(CrmBanner) {
        return request({
            url: `/educms/banneradmin/updateBanner`,
            method: 'put',
            data:CrmBanner
          })
    },
    //5、删除Banner
    removeBanner(id) {
        return request({
            url: `/educms/banneradmin/removeBanner/${id}`,
            method: 'delete'
          })
    }

}
