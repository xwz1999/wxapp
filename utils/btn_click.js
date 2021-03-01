function noMore() {
    let that = this;
    if (that.btn_show) {
		
        that.btn_show = false;
        setTimeout(function () {
            that.btn_show = true;
			
			console.log(that.btn_show)
        }, 1000)
    } else {
        console.log("请勿频繁点击")
    }
}
export default {
    noMore
}