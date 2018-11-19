/**
 * @name copyDirectory
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
 * @name 유효한 파일명으로 거르기
 * @return {string}
 * @since 2018-07-13
 */
function filterFileName(value) {
	return (typeof value === 'string') ? value.replace(/[\/:"*?"<>|]/g, '') : '';
}

/**
 * @param {string} directory
 * @param {string} saveDirectory
 * @param {string || array} saveName
 * @since 2018-09-05
 */
function copyDirectory(directory, saveDirectory, saveName) {
	//문자이면서 값이 있을 때
	if(typeof saveName === 'string' && saveName) {
		saveName = [saveName];
	}

	//문자일 때
	if(typeof directory === 'string') {
		//문자일 때
		if(typeof saveDirectory === 'string') {
			//배열일 때
			if(Array.isArray(saveName)) {
				saveName.forEach((value, index, array) => {
					value = saveDirectory + filterFileName(value);

					try {
						fs.copySync(directory, value);
						console.log(value + '에 저장하였습니다.');
					}catch(e) {
						console.error(e);
					}
				});
			}else{
				console.error('saveName : 배열이 아닙니다.');
			}
		}else{
			console.error('saveDirectory : 문자가 아닙니다.');
		}
	}else{
		console.error('directory : 문자가 아닙니다.');
	}
}

//질문
rl.question('경로 : ', (directory) => {
	//값이 있을 때
	if(directory) {
		rl.question('저장 경로 : ', (saveDirectory) => {
			//값이 있을 때
			if(saveDirectory) {
				rl.question('저장할 이름 : ', (saveName) => {
					//값이 있을 때
					if(saveName) {
						copyDirectory(directory, saveDirectory, saveName.split(','));
					}else{
						console.error('저장할 이름을 입력해주세요.');
					}

					rl.close();
				});
			}else{
				console.error('저장 경로를 입력해주세요.');
				rl.close();	
			}
		});
	}else{
		console.error('경로를 입력해주세요.');
		rl.close();
	}
});