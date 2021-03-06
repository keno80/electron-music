import lodash from "lodash";

//歌曲的秒转字符串
export function timeToString(param) {
	param = parseInt(param)
	let mm = '', ss = ''
	if (param >= 0 && param < 60) {
		param < 10 ? (ss = '0' + param) : (ss = param)
		return '00:' + ss;
	} else if (param >= 60 && param < 3600) {
		mm = parseInt(param / 60)
		mm < 10 ? (mm = '0' + mm) : mm
		param - parseInt(mm * 60) < 10 ? (ss = '0' + String(param - parseInt(mm * 60))) : (ss = param - parseInt(mm * 60))
		return mm + ':' + ss
	}
}

export function TimeToSeconds(time) {
	// 格式化歌词的时间 转换成 sss:ms
	const regMin = /.*:/;
	const regSec = /:.*\./;
	const regMs = /\./;

	const min = parseInt(time.match(regMin)[0].slice(0, 2));
	let sec = parseInt(time.match(regSec)[0].slice(1, 3));
	const ms = time.slice(
		time.match(regMs).index + 1,
		time.match(regMs).index + 3
	);
	if (min !== 0) {
		sec += min * 60;
	}
	return Number(sec + "." + ms);
}

//不含小数点的歌曲时长处理
export function numberToTime(param) {
	let time = ''
	if (param.toString().length === 6) {
		time = param.toString().slice(0, 3) + '.' + param.toString().slice(3)
	} else if (param.toString().length === 5) {
		time = param.toString().slice(0, 2) + '.' + param.toString().slice(2)
	}

	return timeToString(time)
}

//歌单播放列表处理
export function concatPlayListAndMusicList(playList, musicList, index) {
	let pf = lodash.slice(playList, 0, index + 1)
	let pb = lodash.slice(playList, index + 1)

	return pf.concat(musicList).concat(pb)
}