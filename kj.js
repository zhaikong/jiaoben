/*
 * 脚本功能：芬空间 - 会员课+付费课+大师课+直播课解锁
 * 软件版本：3.1.2
 * 脚本作者：**
 * 更新时间：2024-2-3
 * 使用声明：⚠️此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！⚠️⚠️⚠️
 *******************************
 * [rewrite_local]
 * # > 芬空间,会员课+付费课+大师课+直播课
 * ^https?:\/\/api\.zhangdefenspace\.com\/api\/(course\/getCoursePeriodList|course\/getCourseDetails|user\/getIndexUser|v2\/live\/getLiveDetails).*$ url script-response-body https://raw.githubusercontent.com/zhaikong/jiaoben/main/kj.js
 *
 * [mitm] 
 * hostname = api.zhangdefenspace.com
 */

// 解析响应体
var body = $response.body;
var url = $request.url;
var obj = JSON.parse(body);

// 定义需要处理的API端点
const vip = '/user/getIndexUser';
const course = '/course/getCourseDetails';
const coursePeriod = '/course/getCoursePeriodList';
const live = '/v2/live/getLiveDetails';

// 处理用户信息接口
if (url.indexOf(vip) != -1) {
    if (obj.data) {
        // 设置用户为VIP
        obj.data.isVip = true;
        obj.data.vipLevel = 3;
        obj.data.vipEndTime = "2099-12-31 23:59:59";
        
        // 修改用户名
        obj.data.nickname = "lb";  // 这里可以修改为您想要的用户名
        
        // 修改用户头像
        // 注意：这里需要一个有效的图片URL。您需要替换为实际可用的URL
        obj.data.avatar = "https://www.google.com/imgres?q=%E7%BE%8E%E5%A5%B3&imgurl=https%3A%2F%2Fp1.itc.cn%2Fimages01%2F20230923%2F3c762b38c58241099909aa1c1f81ded0.jpeg&imgrefurl=https%3A%2F%2Fwww.sohu.com%2Fa%2F722813383_121654801&docid=z6JUmGa-DjHytM&tbnid=em2WN76IKjt56M&vet=12ahUKEwiPy6z-45SJAxWk4zgGHXtyCo4QM3oECBEQAA..i&w=720&h=981&hcb=2&ved=2ahUKEwiPy6z-45SJAxWk4zgGHXtyCo4QM3oECBEQAA";
        
        // 修改VIP信息
        if (obj.data.vipInfo) {
            obj.data.vipInfo.isVip = true;
            obj.data.vipInfo.vipEndTime = "2099-12-31 23:59:59";
            obj.data.vipInfo.vipLevel = 3;
        }
    }
} 
// 处理课程、课程列表和直播接口
else if (url.indexOf(course) != -1 || url.indexOf(coursePeriod) != -1 || url.indexOf(live) != -1) {
    if (obj.data) {
        // 解锁所有内容
        obj.data.isBuy = true;
        obj.data.isVip = true;
        obj.data.canWatch = true;
        obj.data.isFree = true;
        obj.data.isUnlock = true;
        obj.data.isLock = false;
        
        // 处理视频信息
        if (obj.data.videoInfo) {
            obj.data.videoInfo.canWatch = true;
            obj.data.videoInfo.isLock = false;
            obj.data.videoInfo.isBuy = true;
        }
        
        // 处理课程列表
        if (obj.data.periodList && Array.isArray(obj.data.periodList)) {
            obj.data.periodList.forEach(period => {
                period.isBuy = true;
                period.canWatch = true;
                period.isLock = false;
                period.isFree = true;
                if (period.videoInfo) {
                    period.videoInfo.canWatch = true;
                    period.videoInfo.isLock = false;
                    period.videoInfo.isBuy = true;
                }
            });
        }
    }
}

// 将修改后的对象转回JSON字符串
body = JSON.stringify(obj);

// 返回修改后的响应体
$done({body});
