/**
 * @name copyPath
 * @author JungHyunKwon
 * @since 2019-09-05
 */

'use strict';

const fs = require('fs-extra'),
	  readline = require('readline'),
	  rl = readline.createInterface({
	      input : process.stdin,
		  output : process.stdout
	  });

/**
 * @name 공백제거
 * @return {string}
 * @since 2018-07-13
 */
String.prototype.removeBlank = function() {
	return this.replace(/\s/g, '');
};

/**
 * @name 유효한 파일명으로 거르기
 * @return {string}
 * @since 2018-07-13
 */
String.prototype.filterFileName = function() {
	return this.replace(/[\/"*?"<>|]/g, '');
};

/**
 * @name 경로 복사
 * @param {string || array} name
 * @param {string} path
 * @param {string} savePath
 * @since 2018-09-05
 */
function copyPath(name, path, savePath) {
	//문자이면서 값이 있을때
	if(typeof name === 'string' && name) {
		name = [name];
	}

	//배열일때
	if(Array.isArray(name)) {
		//문자일때
		if(typeof path === 'string') {
			//문자일때
			if(typeof savePath === 'string') {
				name.forEach((value, index, array) => {
					value = savePath + value.filterFileName();

					try {
						fs.copySync(path, value);
						console.log(value + '에 저장하였습니다.');
					}catch(error) {
						console.error(error);
					}
				});
			}else{
				console.error('savePath : 문자가 아닙니다.');
			}
		}else{
			console.error('path : 문자가 아닙니다.');
		}
	}else{
		console.error('name : 배열이 아닙니다.');
	}
}

//질문
rl.question('이름 : ', (name) => {
	//값이 있을때
	if(name) {
		name = name.removeBlank().split(',');

		rl.question('경로 : ', (path) => {
			//값이 있을때
			if(path) {
				rl.question('저장경로 : ', (savePath) => {
					//값이 있을때
					if(savePath) {
						copyPath(name, path, savePath);
					}else{
						console.error('저장경로를 입력해주세요.');
					}

					rl.close();	
				});
			}else{
				console.error('경로를 입력해주세요.');
				rl.close();
			}
		});
	}else{
		console.error('이름을 입력해주세요.');
		rl.close();
	}
});