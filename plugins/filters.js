/**
 * Diamond1Level = 100    	钻一店铺
 * 	Diamond2Level = 130    钻二店铺
 * 	Diamond3Level = 160    钻三店铺
 * GoldLevel    = 200    黄金店铺
 * SilverLevel  = 300    白银店铺
 * MasterLevel  = 400    店主 
 * 	VipLevel     = 500    会员
 * */
export function roleFilter(roleLevel, format) {
	let roleText, badge, mineBg, otherBg
	switch (roleLevel) {
		case 500:
			roleText = "会员"
			badge = '/badge00.png'
			mineBg = "/mine/role00.png"
			otherBg = "/role00.jpg"
			break;
		case 400:
			roleText = "店主"
			//  bgImage =   'bg02.png'
			badge = '/badge01.png'
			mineBg = "/mine/role01.png"
			otherBg = "/role01.jpg"
			break;
		case 300:
			roleText = "白银店铺"
			//  bgImage =   'bg03.png'
			badge = '/badge02.png'
			mineBg = "/mine/role02.png"
			otherBg = "/role02.jpg"
			break;
		case 200:
			roleText = "黄金店铺"
			//  bgImage =   'bg04.png'
			badge = '/badge03.png'
			mineBg = "/mine/role03.png"
			otherBg = "/role03.jpg"
			break;
		case 100:
			roleText = "钻石店铺"
			//  bgImage =   'bg05.png'
			badge = '/badge04.png'
			mineBg = "/mine/role04.png"
			otherBg = "/role04.jpg"
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
		default:
			break;
	}

}
