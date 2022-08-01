/**
 * Diamond1Level = 100    钻一店铺
 *	Diamond2Level = 130    钻二店铺
 *	Diamond3Level = 160    钻三店铺
 *	GoldLevel    = 200    黄金店铺
 *	SilverLevel  = 2    白银店铺
 *	MasterLevel  = 1    店主 
 *	VipLevel     = 0    会员
 * */
export function roleFilter(roleLevel, format,isOffline) {
	let roleText, badge, mineBg, otherBg, levelIcon
	switch (roleLevel) {
		case 0:
			roleText = "会员"
			badge = '/wxapp/badge01.png'
			mineBg = "/wxapp/mine/role01.png"
			otherBg = "/wxapp/role01.jpg"
			levelIcon = "/wxapp/level01.png"
			break;
		case 1:
			roleText = "店主"
			badge = '/wxapp/badge02.png'
			mineBg = "/wxapp/mine/role02.png"
			otherBg = "/wxapp/role02.jpg"
			levelIcon = "/wxapp/level02.png"
			break;
		case 2:
			if(isOffline){
				roleText = "VIP店铺"
				mineBg = "/wxapp/mine/role_vipdp.png"
			}else{
				roleText = "店铺"
				mineBg = "/wxapp/mine/role04.png"
			}
			badge = '/wxapp/badge04.png'
			
			otherBg = "/wxapp/role04.jpg"
			levelIcon = "/wxapp/level04.png"
			break;
		case 10:
			roleText = "合伙人"
			badge = ''
			mineBg = "/wxapp/mine/role_hhr.png"
			otherBg = "/wxapp/role04.jpg"
			levelIcon = "/wxapp/level04.png"
			break;
		default:
			break;
	}
	switch (format) {
		case 'txt':
			return roleText
			break;
		case 'mineBg':
			return mineBg
			break;
		case 'badge':
			return badge
			break;
		case 'otherBg':
			return otherBg
			break;
		case 'levelIcon':
			return levelIcon;
			break;
		default:
			break;
	}

}

export function formatDate(date, format) {
	date = new Date(date);
	let year = date.getFullYear()
	let month = date.getMonth() + 1;
	let nextMonth = month + 1
	let day = date.getDate();
	let hour = date.getHours();
	let minutes = date.getMinutes()

	if (month < 10) {
		month = '0' + month
	}
	if (day < 10) {
		day = '0' + day
	}
	if (hour < 10) {
		hour = '0' + hour
	}
	if (minutes < 10) {
		minutes = '0' + minutes
	}
	switch (format) {
		case "yy-mm-dd":
			return `${year}-${month}-${day}`;
			break;
		case "mm-dd":
			return `${month}-${day}`;
			break;
		case "mm-dd":
			return `${month}月${day}日`;
			break;
		case 'datetime':
			return `${year}-${month}-${day} ${hour}:${minutes}`;
			break;
		case 'yy-mm':
			return `${year}-${month}`;
			break;


			// 考核日期
		case 'checkStartDate':
			return `${month}月01日`;
			break;
		case 'checkEndDate':
			let str = new Date(year, month, 0);
			let m = str.getMonth() + 1;
			let d = str.getDate();
			return `${m}月${d}日`;
			break;
		case 'checkDate':

			if (nextMonth < 10) {
				nextMonth = '0' + nextMonth
			}
			return `${nextMonth}月01日`;
			break;
		default:
			break;
	}
}
