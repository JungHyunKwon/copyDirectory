/**
 * @names copyDirectory
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
 * @names 유효한 파일명으로 거르기
 * @return {string}
 * @since 2018-07-13
 */
function filterFilename(value) {
	return (typeof value === 'string') ? value.replace(/[\/:"*?"<>|]/g, '') : '';
}

/**
 * @param {obejct} options {
       copyPath : string,
	   storagePath : string,
	   names : string || array
   }
 * @since 2018-09-05
 */
function copyDirectory(options) {
	let copyPath = options.copyPath;

	//문자일 때
	if(typeof copyPath === 'string') {
		let storagePath = options.storagePath;

		//문자일 때
		if(typeof storagePath === 'string') {
			let names = options.names;

			//문자이면서 값이 있을 때
			if(typeof names === 'string' && names) {
				names = [names];
			}

			//배열일 때
			if(Array.isArray(names)) {
				let namesLength = names.length;

				(function loopNames(index) {
					//이름 개수만큼 반복
					if(namesLength > index) {
						let name = names[index],
							filteredFilename = filterFilename(name);

						fs.copy(copyPath, storagePath + '/' + filteredFilename, (err) => {
							//오류가 있을 때
							if(err) {
								console.error(filteredFilename + ' - 복사 실패');
							}else{
								console.log(filteredFilename + ' - 복사 성공');
							}
							
							loopNames(index + 1);
						});
					}else{
						console.log('작업을 완료하였습니다.');
					}
				})(0);
			}else{
				console.error('names : 문자 또는 배열이 아닙니다.');
			}
		}else{
			console.error('storagePath : 문자가 아닙니다.');
		}
	}else{
		console.error('copyPath : 문자가 아닙니다.');
	}
}

//질문
rl.question('복사 경로 : ', (copyPath) => {
	//값이 있을 때
	if(copyPath) {
		rl.question('저장 경로 : ', (storagePath) => {
			//값이 있을 때
			if(storagePath) {
				console.log('\n쉼표로 구분할 수 있습니다.');

				rl.question('이름 : ', (names) => {
					//값이 있을 때
					if(names) {
						copyDirectory({
							copyPath : copyPath,
							storagePath : storagePath,
							names : names.split(',')
						});
					}else{
						console.error('이름을 입력해주세요');
					}

					rl.close();
				});
			}else{
				console.error('저장 경로를 입력해주세요');
				rl.close();	
			}
		});
	}else{
		console.error('복사 경로를 입력해주세요');
		rl.close();
	}
});